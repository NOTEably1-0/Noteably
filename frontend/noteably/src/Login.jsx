import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Define the navigate function

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/studentauth/login', {
                username: email, // Email used as the username
                password: password,
            });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                navigate('/dashboard');
            } else {
                setMessage('Login failed. Please try again.');
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setMessage('Incorrect email or password.');
            } else {
                setMessage(error.response ? error.response.data : 'Error logging in');
            }
        }
    };

    return (
        <div className="login-page">
            <header className="header">
                <img src="/noteably_logo.png" alt="Notably Logo" className="logo" />
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
                        <p className="forgot-password">
                            <Link to="/forgot-password">Forgot password?</Link>
                        </p>
                        <button type="submit" className="login-button">Log in</button>
                    </form>
                    {message && <p className="error-message">{message}</p>}
                    <p>Admin? <Link to="/admin-login">Login here</Link></p>
                </div>
            </div>
        </div>
    );
};
    
export default Login;