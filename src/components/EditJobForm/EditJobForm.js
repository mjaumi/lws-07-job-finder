import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getEditableJob, resetStatus, updateJob } from '../../features/job/jobSlice';

const EditJobForm = () => {
    // integration of react-redux hooks here
    const dispatch = useDispatch();
    const { id, title, type, salary, deadline } = useSelector(state => state.job.job);
    const { isLoading, status, isError } = useSelector(state => state.job);

    // integration of react hooks here
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedType, setEditedType] = useState(type);
    const [editedSalary, setEditedSalary] = useState(salary);
    const [editedDeadline, setEditedDeadline] = useState(deadline);

    // integration of react-router-dom hooks here
    const { jobId } = useParams();
    const navigate = useNavigate();

    // showing toast to the user here about editing existing job
    useEffect(() => {
        dispatch(getEditableJob(jobId));

        if (id) {
            setEditedTitle(title);
            setEditedType(type);
            setEditedSalary(salary);
            setEditedDeadline(deadline);
        }
    }, [dispatch, jobId, id, title, type, salary, deadline]);

    // showing toast to the user here about editing existing job
    useEffect(() => {
        if (!isLoading) {
            if (!isError && status === 200) {
                toast.success('Job Updated Successfully!!!', {
                    toastId: 'updateSuccessToast',
                });
                // returning to home page after editing
                navigate('/');
            }

            if (isError || (status !== 200 && status !== -1)) {
                toast.error('Something Went Wrong. Please, Try Again Later.', {
                    toastId: 'updateErrorToast',
                });
            }

            dispatch(resetStatus());
        }
    }, [dispatch, isLoading, isError, status, navigate]);

    // this function is to reset the form after submission or error
    const resetForm = () => {
        setEditedTitle('');
        setEditedType('');
        setEditedSalary('');
        setEditedDeadline('');
    }

    // handler function to handle form submission
    const editJobFormSubmissionHandler = e => {
        e.preventDefault();

        // dispatching action to add new job
        dispatch(updateJob({
            id,
            data: {
                title: editedTitle,
                type: editedType,
                salary: Number(editedSalary),
                deadline: editedDeadline,
            },
        }));

        resetForm();
    }

    // rendering edit job form component here 
    return (
        <>
            <h1 className='mb-10 text-center lws-section-title'>Edit Job</h1>

            <div className='max-w-3xl mx-auto'>
                <form onSubmit={editJobFormSubmissionHandler} className='space-y-6'>
                    <div className='fieldContainer'>
                        <label htmlFor='lws-JobTitle' className='text-sm font-medium text-slate-300'>Job Title</label>
                        <select onChange={e => setEditedTitle(e.target.value)} value={editedTitle} id='lws-JobTitle' name='lwsJobTitle' required>
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
                        <select onChange={e => setEditedType(e.target.value)} value={editedType} id='lws-JobType' name='lwsJobType' required>
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
                            <input onChange={e => setEditedSalary(e.target.value)} value={editedSalary} type='number' name='lwsJobSalary' id='lws-JobSalary' required className='!rounded-l-none !border-0'
                                placeholder='20,00,000' />
                        </div>
                    </div>

                    <div className='fieldContainer'>
                        <label htmlFor='lws-JobDeadline'>Deadline</label>
                        <input onChange={e => setEditedDeadline(e.target.value)} value={editedDeadline} type='date' name='lwsJobDeadline' id='lws-JobDeadline' required />
                    </div>

                    <div className='text-right'>
                        <button type='submit' id='lws-submit' className='cursor-pointer btn btn-primary w-fit'>
                            Edit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditJobForm;