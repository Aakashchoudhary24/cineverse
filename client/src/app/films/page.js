'use client';
import Navbar from "../components/navbar";
import '../styles/films.css';
import '../styles/page.css';
import { useState } from "react";

export default function Films() {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const TMDB_API_KEY = '538ba5fedf47c79f61f4055ec9f9841c';

    const handleSearch = async (event) => {
        event.preventDefault();
        if (!searchQuery.trim()) {
            alert("Please enter a search query.");
            return;
        }
        try {
            const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(searchQuery)}&page=1&include_adult=false`;
            const response = await fetch(url);
            const data = await response.json();
            setMovies(data.results || []);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    return (
        <div className="main">
            <Navbar />
            <div className="films-container">
                <form onSubmit={handleSearch} className="search-form">
                    <label htmlFor='search'>Browse By : </label>
                    <input
                    name="search"
                        type="text"
                        placeholder="Search for a movie..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-query"
                    />
                    <input
                    name="genre"
                    type="text"
                    placeholder="Genre"
                    id="genre"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-query"
                    />
                    <button type="submit" className="search-button">
                        Search
                    </button>
                </form>

                <div className="movies-grid">
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <div key={movie.id} className="movie-card">
                                <img
                                    src={
                                        movie.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                            : 'https://via.placeholder.com/500x750?text=No+Image'
                                    }
                                    alt={movie.title}
                                    className="movie-poster"
                                />
                                <h3 className="movie-title">{movie.title}</h3>
                                <p className="movie-details">
                                    {movie.release_date?.split("-")[0]} | ⭐
                                    {movie.vote_average || "N/A"}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No movies found. Try another search.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
