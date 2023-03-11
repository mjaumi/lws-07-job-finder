import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../../features/jobs/jobsSlice';
import JobItem from '../JobItem/JobItem';

const JobList = () => {
    // integration of react-redux hooks here
    const dispatch = useDispatch();
    const { isLoading, jobs, isError, error } = useSelector(state => state.jobs);
    const { filterBy } = useSelector(state => state.filters);

    // fetching all the jobs from the server here
    useEffect(() => {
        dispatch(fetchJobs());
    }, [dispatch]);

    // making mutable copy for filtering
    const mutableJobs = [...jobs];

    // this function is to filter jobs
    const filterJobs = job => {
        return filterBy === 'All' ? job : job.type === filterBy;
    }

    // deciding what to render here
    let content = null;

    if (isLoading) {
        content = <p>Loading ...</p>;
    }

    if (!isLoading && isError) {
        content = <p>{error}</p>;
    }

    if (!isLoading && !isError && !jobs.length) {
        content = <p>No Jobs Found!!</p>;
    }

    if (!isLoading && !isError && jobs.length) {
        content = mutableJobs
            .filter(filterJobs)
            .map(job => <JobItem
                key={job.id}
                job={job}
            />);
    }

    // rendering the job list component here
    return (
        <>
            <div className='md:flex space-y-2 md:space-y-0 justify-between mb-10 '>
                <h1 className='lws-section-title'>{filterBy === 'All' ? 'All Available Jobs' : `${filterBy} Jobs`}</h1>
                <div className='flex gap-4'>
                    <div className='search-field group flex-1'>
                        <i className='fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500'></i>
                        <input type='text' placeholder='Search Job' className='search-input' id='lws-searchJob' />
                    </div>
                    <select id='lws-sort' name='sort' autoComplete='sort' className='flex-1'>
                        <option>Default</option>
                        <option>Salary (Low to High)</option>
                        <option>Salary (High to Low)</option>
                    </select>
                </div>
            </div>

            <div className='jobs-list'>
                {content}
            </div>
        </>
    );
};

export default JobList;