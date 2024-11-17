// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
    return (
        <div className="landing-container">
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

            <main className="main-content">
                <img src="/noteably_logo.png" alt="Notably Logo" className="main-logo" />
                <h1 className="main-heading">Catchy Slogan Here</h1>
                <p className="subtext">Use our site because it's awesome!</p>
                <p className="cta-text">Start now or miss out!</p>
                <Link to="/register">
                    <button className="register-button">Register</button>
                </Link>
            </main>
        </div>
    );
}

export default LandingPage;
