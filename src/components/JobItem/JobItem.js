import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { removeJob, resetStatus } from '../../features/job/jobSlice';
import numberWithCommas from '../../utils/numberWithCommas';

const JobItem = ({ job }) => {
    // destructuring the job object here
    const { id, title, type, salary, deadline } = job || {};

    // integration of react-redux hooks here
    const dispatch = useDispatch();
    const { isLoading, status, isError } = useSelector(state => state.job);

    // integration of react-router-dom hooks here
    const navigate = useNavigate();

    // showing toast to the user here about deleting a job
    useEffect(() => {
        if (!isLoading) {
            if (!isError && status === 200) {
                toast.success('Job Deleted Successfully!!!', {
                    toastId: 'deleteSuccessToast',
                });
            }

            if (isError || (status !== 200 && status !== -1)) {
                toast.error('Something Went Wrong. Please, Try Again Later.', {
                    toastId: 'deleteErrorToast',
                });
            }

            dispatch(resetStatus());
        }
    }, [dispatch, isLoading, isError, status]);

    // handler function for handling routing to edit job page
    const rerouteToEditPageHandler = () => {
        navigate(`/edit-job/${id}`);
    }

    // handler function for handling delete job from the server
    const deleteJobHandler = () => {
        dispatch(removeJob(id));
    }

    // rendering job item card component here
    return (
        <div className='lws-single-job'>
            <div className='flex-1 min-w-0'>
                <h2 className='lws-title'>{title}</h2>
                <div className='job-footers'>
                    <div className='lws-type'>
                        <i className={`fa-solid fa-stop ${type === 'Internship' ? '!text-[#FF5757]' : type === 'Remote' ? '!text-[#56E5C4]' : '!text-[#FF8A00]'} text-lg mr-1.5`}></i>
                        {type}
                    </div>
                    <div className='lws-salary'>
                        <i className='fa-solid fa-bangladeshi-taka-sign text-slate-400 text-lg mr-1.5'></i>
                        BDT {numberWithCommas(salary)}
                    </div>
                    <div className='lws-deadline'>
                        <i className='fa-regular fa-calendar text-slate-400 text-lg mr-1.5'></i>
                        Closing on {deadline}
                    </div>
                </div>
            </div>
            <div className='mt-5 flex lg:mt-0 lg:ml-4'>
                <span className='hidden sm:block'>
                    <button onClick={rerouteToEditPageHandler} type='button' className='lws-edit btn btn-primary'>
                        <i className='fa-solid fa-pen text-gray-300 -ml-1 mr-2'></i>
                        Edit
                    </button>
                </span>

                <span className='sm:ml-3'>
                    <button onClick={deleteJobHandler} type='button' className='lws-delete btn btn-danger '>
                        <i className='fa-solid fa-trash text-gray-300 -ml-1 mr-2'></i>
                        Delete
                    </button>
                </span>
            </div>
        </div>
    );
};

export default JobItem;