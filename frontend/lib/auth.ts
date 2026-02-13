import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

export const register = async (userData: any) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

export const login = async (userData: any) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const getCurrentUser = () => {
    return localStorage.getItem('token');
};

export const createJob = async (jobData: any) => {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:8080/api/jobs', jobData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const getMyJobs = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8080/api/jobs', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const uploadCandidate = async (jobId: string, formData: FormData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`http://localhost:8080/api/jobs/${jobId}/candidates`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const getCandidates = async (jobId: string) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:8080/api/jobs/${jobId}/candidates`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};
