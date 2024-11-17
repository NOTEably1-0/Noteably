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
                <h1 className="main-heading">"Welcome to NOTEably – Your All-in-One Productivity Partner."</h1>
                <p className="subtext">Stay organized, focused, and ahead with tools that fit your study life!"</p>
                <p className="subtext">SIgn in to make study life easier, one feature at a time.</p>
                <p className="cta-text">Start now or miss out!</p>
                <Link to="/register">
                    <button className="register-button">Register</button>
                </Link>
            </main>
        </div>
    );
}

export default LandingPage;
