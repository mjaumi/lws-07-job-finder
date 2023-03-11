import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filtered } from '../../features/filters/filtersSlice';

const Sidebar = () => {
    // integration of react-redux hooks here
    const dispatch = useDispatch();
    const { filterBy } = useSelector(state => state.filters);

    // handler function to handle filter feature
    const filterHandler = text => {
        dispatch(filtered(text));
    }

    // rendering the sidebar component here
    return (
        <div className='sidebar'>
            <nav>
                <ul className='space-y-4'>
                    <li>
                        <Link to={'/'} onClick={() => filterHandler('All')} className={`main-menu ${filterBy === 'All' && 'menu-active'}`} id='lws-alljobs-menu'>
                            <i className='fa-solid fa-briefcase'></i>
                            <span> All Available Jobs</span>
                        </Link>
                        <ul className='space-y-6 lg:space-y-2 '>
                            <li>
                                <button onClick={() => filterHandler('Internship')} className={`sub-menu ${filterBy === 'Internship' && 'menu-active'}`} id='lws-internship-menu'>
                                    <i className='fa-solid fa-stop !text-[#FF5757]'></i>
                                    <span> Internship</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={() => filterHandler('Full Time')} className={`sub-menu ${filterBy === 'Full Time' && 'menu-active'}`} id='lws-fulltime-menu'>
                                    <i className='fa-solid fa-stop !text-[#FF8A00]'></i>
                                    <span> Full Time</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={() => filterHandler('Remote')} className={`sub-menu ${filterBy === 'Remote' && 'menu-active'}`} id='lws-remote-menu'>
                                    <i className='fa-solid fa-stop !text-[#56E5C4]'></i>
                                    <span> Remote</span>
                                </button>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to={'/add-new-job'} className='main-menu' id='lws-addJob-menu'>
                            <i className='fa-solid fa-file-circle-plus'></i>
                            <span> Add NewJob</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;