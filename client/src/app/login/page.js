'use client';

import '../styles/login-register.css';
import Navbar from '../components/navbar';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function LoginPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsAuthenticated(true); // User is authenticated
        }
    }, []);

    if (isAuthenticated) {
        redirect('/');
        return null;
    }

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        setError('');

        const formData = new FormData(event.target);
        let username = formData.get('username');
        const password = formData.get('password');
        username = username.toLowerCase();

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('accessToken', data.access_token);
                alert('Login successful!, Redirecting to Home');
                window.location.href = '/';
            } else {
                setError(data.error || 'Invalid username or password');
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="main">
            <Navbar />
            <div className="login-container">
                <form onSubmit={handleLoginSubmit} method="POST" className="login-form">
                    <h1 className="form-title">Login</h1>

                    <div className='form-group'>
                    <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            required/>
                    </div>

                    <div className='form-group'>
                    <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="submit-button">Login</button>
                        <p className="redirect-link">
                            Don't have an account? <a href="/register">Register</a>
                        </p>
                    </div>

                </form>
            </div>
        </div>
    );
}
