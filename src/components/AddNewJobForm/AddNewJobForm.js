import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createJob, resetStatus } from '../../features/job/jobSlice';

const AddNewJobForm = () => {
    // integration of react hooks here
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [salary, setSalary] = useState('');
    const [deadline, setDeadline] = useState('');

    // integration of react-redux hooks here
    const dispatch = useDispatch();
    const { isLoading, status, isError } = useSelector(state => state.job);

    // showing toast to the user here about adding new job
    useEffect(() => {
        if (!isLoading) {
            if (!isError && status === 201) {
                toast.success('New Job Added Successfully!!!', {
                    toastId: 'addSuccessToast',
                });
            }

            if (isError || (status !== 201 && status !== -1)) {
                toast.error('Something Went Wrong. Please, Try Again Later.', {
                    toastId: 'addErrorToast',
                });
            }

            dispatch(resetStatus());
        }
    }, [dispatch, isLoading, isError, status]);

    // this function is to reset the form after submission or error
    const resetForm = () => {
        setTitle('');
        setType('');
        setSalary('');
        setDeadline('');
    }

    // handler function to handle form submission
    const addJobFormSubmissionHandler = e => {
        e.preventDefault();

        // dispatching action to add new job
        dispatch(createJob({
            title,
            type,
            salary: Number(salary),
            deadline,
        }));

        resetForm();
    }

    // rendering add new job form component here 
    return (
        <>
            <h1 className='mb-10 text-center lws-section-title'>Add New Job</h1>

            <div className='max-w-3xl mx-auto'>
                <form onSubmit={addJobFormSubmissionHandler} className='space-y-6'>
                    <div className='fieldContainer'>
                        <label htmlFor='lws-JobTitle' className='text-sm font-medium text-slate-300'>Job Title</label>
                        <select onChange={e => setTitle(e.target.value)} value={title} id='lws-JobTitle' name='lwsJobTitle' required>
                            <option hidden>Select Job</option>
                            <option>Software Engineer</option>
                            <option>Software Developer</option>
                            <option>Full Stack Developer</option>
                            <option>MERN Stack Developer</option>
                            <option>DevOps Engineer</option>
                            <option>QA Engineer</option>
                            <option>Product Manager</option>
                            <option>Social Media Manager</option>
                            <option>Senior Executive</option>
                            <option>Junior Executive</option>
                            <option>Android App Developer</option>
                            <option>IOS App Developer</option>
                            <option>Frontend Developer</option>
                            <option>Frontend Engineer</option>
                        </select>
                    </div>

                    <div className='fieldContainer'>
                        <label htmlFor='lws-JobType'>Job Type</label>
                        <select onChange={e => setType(e.target.value)} value={type} id='lws-JobType' name='lwsJobType' required>
                            <option hidden>Select Job Type</option>
                            <option>Full Time</option>
                            <option>Internship</option>
                            <option>Remote</option>
                        </select>
                    </div>

                    <div className='fieldContainer'>
                        <label htmlFor='lws-JobSalary'>Salary</label>
                        <div className='flex border rounded-md shadow-sm border-slate-600'>
                            <span className='input-tag'>BDT</span>
                            <input onChange={e => setSalary(e.target.value)} value={salary} type='number' name='lwsJobSalary' id='lws-JobSalary' required className='!rounded-l-none !border-0'
                                placeholder='20,00,000' />
                        </div>
                    </div>

                    <div className='fieldContainer'>
                        <label htmlFor='lws-JobDeadline'>Deadline</label>
                        <input onChange={e => setDeadline(e.target.value)} value={deadline} type='date' name='lwsJobDeadline' id='lws-JobDeadline' required />
                    </div>

                    <div className='text-right'>
                        <button type='submit' id='lws-submit' className='cursor-pointer btn btn-primary w-fit'>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddNewJobForm;