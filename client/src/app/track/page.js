'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import '../styles/track.css';
import AddTrackForm from './addTrackForm';

export default function Track() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            alert("Please log in to access this page.");
            window.location.href='/login';
        } else {
            fetchMovies();
        }
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/track', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            const data = await response.json();
            setMovies(data.track || []);
        } catch (error) {
            console.log("Error fetching movies:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const AddTrackForm = () => {
        const [movieName, setMovieName] = useState('');
        const [summary, setSummary] = useState('');
        const [genre, setGenre] = useState('');
        const [rating, setRating] = useState(0);
        const [dateWatched, setDateWatched] = useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();

            const data = {
                movie_name: movieName,
                summary,
                genre,
                rating,
                date_watched: dateWatched,
            };

            try {
                const response = await fetch('http://localhost:5000/api/track', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();
                if (response.ok) {
                    alert('Movie added to your track!');
                } else {
                    alert(result.error || 'Failed to add movie.');
                }
            } catch (error) {
                console.error('Error adding movie:', error);
            }
        };

        return (
            <form onSubmit={handleSubmit}>
                <label>Movie Name</label>
                <input type="text" value={movieName} onChange={(e) => setMovieName(e.target.value)} required />
                <label>Summary</label>
                <textarea value={summary} onChange={(e) => setSummary(e.target.value)} required />
                <label>Genre</label>
                <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
                <label>Rating</label>
                <input type="number" value={rating} onChange={(e) => setRating(Number(e.target.value))} />
                <label>Date Watched</label>
                <input type="date" value={dateWatched} onChange={(e) => setDateWatched(e.target.value)} required />
                <button type="submit">Add to Track</button>
            </form>
        );
    };

    return (
        <div className='main'>
            <Navbar />
            <div className='track-container'>
                {isLoading ? (
                    <p>Loading your tracked movies...</p>
                ) : (
                    <div className='movie-list'>
                        {movies.length === 0 ? (
                            <p>No movies tracked yet.</p>
                        ) : (
                            movies.map((movie, index) => (
                                <div key={index} className='track-card'>
                                    <h3>{movie.movie_name}</h3>
                                    <p>{movie.genre}</p>
                                    <p>{movie.summary}</p>
                                    <p>Rating: {movie.rating}</p>
                                    <p>Watched on: {movie.date_watched}</p>
                                </div>
                            ))
                        )}
                    </div>
                )}
                <AddTrackForm />
            </div>
        </div>
    );
}
