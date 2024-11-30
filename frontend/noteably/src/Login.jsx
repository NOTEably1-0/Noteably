import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from './config/api';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_ENDPOINTS.STUDENT.LOGIN, {
                email: email,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.data) {
                localStorage.setItem('studentId', response.data.id);
                localStorage.setItem('studentName', response.data.name); // Store student name
                alert('Login successful!');
                navigate('/dashboard');
            } else {
                setMessage('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setMessage('Error logging in. Please check your credentials.');
        }
    };
    

    return (
        <div className="login-page">
            <header className="header">
                <img src="/ASSETS/noteably_logo.png" alt="Noteably Logo" className="logo" />
                <div className="auth-buttons">
                    <Link to="/register">
                        <button className="auth-button register">Register</button>
                    </Link>
                    <Link to="/login">
                        <button className="auth-button login">Log In</button>
                    </Link>
                </div>
            </header>
            <div className="login-container">
                <div className="login-card">
                    <h2>Welcome back~!</h2>
                    <p>No account? <Link to="/register">Sign up</Link></p>
                    <form onSubmit={handleLogin} className="login-form">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div className="password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input
                                type="checkbox"
                                className="show-password-checkbox"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                        </div>
                        <button type="submit" className="login-button">Log in</button>
                    </form>
                    {message && <p className="error-message">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default Login;
