'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/navbar'; 
import '../styles/track.css';
import '../styles/forms.css';

export default function TrackPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [tracks, setTracks] = useState([]);
    const [showAddTrackForm, setShowAddTrackForm] = useState(false);
    const [newTrack, setNewTrack] = useState({
        movieName: '',
        genre: '',
        rating: 0,
        summary: '',
    });

    useEffect(() => {
        const token = sessionStorage.getItem('accessToken');
        if (token) {
            setIsAuthenticated(true);
            fetchTracks();
        }
    }, []);

    const fetchTracks = async () => {
        try {
            

            const response = await fetch('http://localhost:5000/api/track', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
    
            if (response.ok) {
                setTracks(data.tracks);
            } else {
                console.log('Failed to fetch tracks:', data);
            }
        } catch (error) {
            console.log('Error fetching tracks:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTrack((prevTrack) => ({
            ...prevTrack,
            [name]: value
        }));
    };

    const handleAddTrack = async (e) => {
        e.preventDefault();
        console.log('Sent track data:', newTrack);
    
        if (!newTrack.movieName || !newTrack.summary) {
            alert("Movie name and summary are required!");
            return;
        }
    
        try {
            const parsedRating = parseInt(newTrack.rating, 10);
            if (isNaN(parsedRating)) {
                alert("Rating must be a valid number between 0 and 10.");
                return;
            }
            const response = await fetch('http://localhost:5000/api/track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({
                    movie_name: newTrack.movieName,
                    genre: newTrack.genre,
                    rating: parsedRating,
                    summary: newTrack.summary,
                }),          
            });
    
            if (response.ok) {
                alert('Track added successfully!');
                setNewTrack({
                    movieName: '',
                    genre: '',
                    rating: 0,
                    summary: '',
                });
                setShowAddTrackForm(false);
                fetchTracks();
            } else {
                console.log('Error adding track:', data.error);
                alert(`Error: ${data.error || 'Failed to add track'}`); 
            }
        } catch (error) {
            console.log('Network or parsing error:', error);
            alert('An error occurred while adding the track');
        }
    };
    
    

    return (
        <div className='main'>
            <Navbar/>
            <div className="track-page">
            <h1>Your Movie Track</h1>
            <button onClick={() => setShowAddTrackForm(!showAddTrackForm)}>
                {showAddTrackForm ? 'Cancel' : 'Add Track'}
            </button>

            {showAddTrackForm && (
                <form onSubmit={handleAddTrack} className="form-container">
                    <div className="form-group">
                        <label>Movie Name:</label>
                        <input
                            type="text"
                            name="movieName"
                            value={newTrack.movieName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Genre (optional):</label>
                        <input
                            type="text"
                            name="genre"
                            value={newTrack.genre}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Rating:</label>
                        <input
                            type="number"
                            name="rating"
                            value={newTrack.rating}
                            onChange={handleInputChange}
                            min="0"
                            max="10"
                        />
                    </div>

                    <div className="form-group">
                        <label>Summary:</label>
                        <textarea
                            name="summary"
                            value={newTrack.summary}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit">Add Track</button>
                </form>
            )}

            <div className="track-list">
                {tracks.map(track => (
                    <div key={track.id} className="track">
                        <h3>{track.movieName}</h3>
                        <p>{track.genre}</p>
                        <p>Rating: {track.rating}</p>
                        <p>{track.summary}</p>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
}
