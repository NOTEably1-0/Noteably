import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/students';

export const addStudent = async (studentData) => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, studentData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const loginStudent = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getStudentById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getStudentByStudentId = async (studentId) => {
    try {
        const response = await axios.get(`${BASE_URL}/find/${studentId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateStudent = async (id, studentData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, studentData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteStudent = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
