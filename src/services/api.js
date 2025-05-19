import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
export const register = async (name, email, password) => {
    const res = await API.post('/auth/register', { name, email, password });
    return res.data;
};

export const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token); // guardar token
    return res.data;
};
export const getMe = async () => {
    const res = await API.get('/auth/me');
    return res.data;
};
export const logout = () => {
    localStorage.removeItem('token');
};
export const createTask = async (task) => {
    const res = await API.post('/tasks', task);
    return res.data.task;
};

export const getTasks = async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const res = await API.get(`/tasks?${params}`);
    return res.data;
};

export const getTaskById = async (id) => {
    const res = await API.get(`/tasks/${id}`);
    return res.data;
};

export const updateTask = async (id, updates) => {
    const res = await API.put(`/tasks/${id}`, updates);
    return res.data.task;
};

export const deleteTask = async (id) => {
    const res = await API.delete(`/tasks/${id}`);
    return res.data;
};
