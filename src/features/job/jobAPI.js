import axios from '../../utils/axios';

// this async function is adding new job in the server
export const addJob = async (data) => {
    const response = await axios.post('/jobs', data);
    return response.status;
}

// this async function is editing existing job from the server
export const editJob = async ({ id, data }) => {
    const response = await axios.put(`/jobs/${id}`, data);
    return response.status;
}

// this async function is deleting job from the server
export const deleteJob = async (id) => {
    const response = await axios.delete(`/jobs/${id}`);
    return response.status;
}

// this async function is getting job from the server to edit form
export const getJobToEdit = async (id) => {
    const response = await axios.get(`/jobs?id_like=${id}`);
    return response.data;
} 