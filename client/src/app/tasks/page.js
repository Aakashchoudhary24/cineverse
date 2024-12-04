// task/page.js;
'use client';

import '../styles/forms.css';
import Navbar from '../components/navbar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const isAuthenticated = () => {
    return !!localStorage.getItem('accessToken');
};

export default function CreateTasks() {
    const router = useRouter();
    const [authChecked, setAuthChecked] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        genres: '',
        image_url: '',
    });
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (!isAuthenticated()) {
            alert('Please log in to add tasks.');
            router.push('/login?redirect=/tasks'); 
        } else {
            setAuthChecked(true);
        }
    }, [router]);

    const handleTaskSubmit = async (event) => {
        event.preventDefault();
        setMessage({ type: '', text: '' });

        const { title, description, genres, image_url } = formData;
        const lowerCaseTitle = title.toLowerCase();
        const lowerCaseGenre = genres.toLowerCase().split(',');

        try {
            const response = await fetch('http://localhost:5000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify({
                    title: lowerCaseTitle,
                    description,
                    genres: lowerCaseGenre,
                    image_url,
                }),
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'Task created successfully!' });
                setFormData({ title: '', description: '', genres: '', image_url: '' });
                router.push('/tasks');
            } else {
                const errorData = await response.json();
                setMessage({ type: 'error', text: errorData.message || 'Task creation failed' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to connect to the server.' });
        }
    };

    if (!authChecked) return null;

    return (
        <div className='main'>
            <Navbar />
            <div className='render-tasks'>
                
            </div>
            <div className="form-container">
                <form onSubmit={handleTaskSubmit} className="task-form">
                    <h1 className='form-title'>Create a Task</h1>
                    {message.text && <p className={`message ${message.type}`}>{message.text}</p>}
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder='Enter task title'
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="genres">Genres (comma-separated):</label>
                        <input
                            type="text"
                            id="genres"
                            name="genres"
                            placeholder='Genres the task might belong to'
                            value={formData.genres}
                            onChange={(e) => setFormData({ ...formData, genres: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder='Enter task description'
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image_url">Image URL:</label>
                        <input
                            type="url"
                            id="image_url"
                            name="image_url"
                            placeholder='Enter any relevant image URLs'
                            value={formData.image_url}
                            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="submit-button">Create Task</button>
                </form>
            </div>
        </div>
    );
}