import axios from '../../utils/axios';

// this async function is getting jobs from the server
const getJobs = async () => {
    const response = await axios.get('/jobs');
    return response.data;
}

export default getJobs;