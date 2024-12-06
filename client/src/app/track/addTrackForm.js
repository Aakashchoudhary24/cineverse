// AddTrackForm.js
import { useState } from 'react';

export default function AddTrackForm() {
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
                // Optionally, reset the form or update the UI
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
}
