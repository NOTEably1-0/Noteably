import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
    return (
        <div className="landing-container">
            <header className="header">
                {/* Use public folder path for the logo */}
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

            <main className="main-content">
                <img src="/ASSETS/noteably_logo.png" alt="Noteably Logo" className="main-logo" />
                <h1 className="main-heading">Welcome to Noteably!</h1>
                <p className="subtext">Organize your notes, manage your tasks, and plan your schedule seamlessly.</p>
                <p className="cta-text">Start now and take control of your productivity!</p>
                <Link to="/register">
                    <button className="register-button">Get Started</button>
                </Link>
            </main>
        </div>
    );
}

export default LandingPage;
