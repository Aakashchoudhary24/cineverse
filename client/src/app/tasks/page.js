'use client';
import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import '../styles/forms.css';
import '../styles/tasks.css';

export default function TasksPage() {

    return (
        <div className="main">
            <Navbar />
            {!showCreateForm ? (
                <div className="render-tasks">
                    <div className="head">
                        <h1>Tasks</h1>
                        <button onClick={() => setShowCreateForm(true)} disabled={!isAuthenticated}>
                            Create Task
                        </button>
                    </div>
                    <div className="tasks-container">
                        {tasks.map((task) => (
                            <div key={task.id} className="task">
                                <h2>{task.title}</h2>
                                <p>{task.genres}</p>
                                <p>{task.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <form className="form-container" onSubmit={handleSubmit}>
                    <h1>Create a Task</h1>
                    <input
                        className="form-input"
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="form-input"
                        type="text"
                        name="genres"
                        placeholder="Genres (comma-separated)"
                        value={formData.genres}
                        onChange={handleChange}
                    />
                    <textarea
                        className="description-text"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    <button className="submit-button" type="submit">
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowCreateForm(false)}
                    >
                        Cancel
                    </button>
                </form>
            )}
        </div>
    );
}
