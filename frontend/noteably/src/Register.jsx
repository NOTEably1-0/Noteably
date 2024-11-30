import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStudent } from './studentService';
import './Register.css';

const Register = () => {
    const [student, setStudent] = useState({
        name: '',
        course: '',
        contactNumber: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addStudent(student).then(() => {
            alert('Registration successful');
            navigate('/login');
        }).catch(error => {
            console.error('Registration failed:', error);
            alert('Registration failed');
        });
    };

    return (
        <div className="auth-container">
            <img src="/ASSETS/noteably_logo.png" alt="Noteably Logo" className="logo" />
            <h1 className="auth-title">Register</h1>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    className="auth-input"
                />
                <input
                    type="text"
                    name="course"
                    placeholder="Course"
                    onChange={handleChange}
                    className="auth-input"
                />
                <input
                    type="text"
                    name="contactNumber"
                    placeholder="Contact Number"
                    onChange={handleChange}
                    className="auth-input"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="auth-input"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="auth-input"
                />
                <button type="submit" className="auth-button">Register</button>
            </form>
        </div>
    );
};

export default Register;