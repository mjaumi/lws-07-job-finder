import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sorted } from '../../features/filters/filtersSlice';
import { fetchJobs } from '../../features/jobs/jobsSlice';
import JobItem from '../JobItem/JobItem';

const JobList = () => {
    // integration of react-redux hooks here
    const dispatch = useDispatch();
    const { isLoading, jobs, isError, error } = useSelector(state => state.jobs);
    const { filterBy, sortBy } = useSelector(state => state.filters);

    // integration of react hooks here
    const [sortText, setSortText] = useState(sortBy);

    // fetching all the jobs from the server here
    useEffect(() => {
        dispatch(fetchJobs());
    }, [dispatch]);

    // dispatching action to sort the jobs here
    useEffect(() => {
        dispatch(sorted(sortText));
    }, [dispatch, sortText]);

    // making mutable copy for filtering
    const mutableJobs = [...jobs];

    // this function is to filter jobs
    const filterJobs = job => {
        return filterBy === 'All' ? job : job.type === filterBy;
    }

    // this function is sorting the jobs based on salary
    const sortJobs = (j1, j2) => {
        switch (sortBy) {
            case 'Salary (Low to High)':
                return (Number(j1.salary) < Number(j2.salary)) ? -1 : (Number(j1.salary) > Number(j2.salary)) ? 1 : 0;

            case 'Salary (High to Low)':
                return (Number(j1.salary) < Number(j2.salary)) ? 1 : (Number(j1.salary) > Number(j2.salary)) ? -1 : 0;

            default:
                return 0;
        }
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
            .sort((j1, j2) => sortJobs(j1, j2))
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
                    <select value={sortText} onChange={e => setSortText(e.target.value)} id='lws-sort' name='sort' autoComplete='sort' className='flex-1'>
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