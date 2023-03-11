import React from 'react';
import { Oval } from 'react-loading-icons';

const Loading = () => {

    // rendering loading component here
    return (
        <div className='w-full mt-5 mb-10 flex justify-center items-center'>
            <Oval width={'60px'} height={'60px'} stroke='#01D991' />
        </div>
    );
};

export default Loading;