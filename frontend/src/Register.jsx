import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/studentauth/register', {
                name,
                course,
                contactNumber,
                email,
                password,
            });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                navigate('/student');
            } else {
                setMessage('Sign up failed. Please try again.');
            }
        } catch (error) {
            setMessage(error.response ? error.response.data : 'Error signing up');
        }
    };

    return (
        <div className="auth-container">
            <img src="noteably_logo.png" alt="Logo" className="auth-logo" />
            <h2 className="auth-title">Sign Up</h2>
            <form onSubmit={handleSignup} className="auth-form">
                <div className="input-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="auth-input"
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Course:</label>
                    <input
                        type="text"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        placeholder="Enter your course"
                        className="auth-input"
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Contact Number:</label>
                    <input
                        type="text"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        placeholder="Enter your contact number"
                        className="auth-input"
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="auth-input"
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="auth-input"
                        required
                    />
                </div>
                <button type="submit" className="auth-button">Sign Up</button>
            </form>
            {message && <p className="auth-message">{message}</p>}
            <p className="auth-link">Already have an account? <Link to="/login">Log in here</Link></p>
        </div>
    );
};

export default Register;