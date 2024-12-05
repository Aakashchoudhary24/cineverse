'use client';

import Link from 'next/link';
import '../styles/navbar.css';
import { useState, useEffect } from 'react';
import { redirect } from 'next/dist/server/api-utils';

export default function Navbar() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    window.location.href='/login';
  };
  const showProfile = () => {
    window.location.href='/register';
  }
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        setIsAuthenticated(true);
    }
  }, []);


  return (
    <nav className='navbar'>
      <div className='container' id='nav-container'>
        <div className='logo'>
          <span>CineVerse</span>
        </div>

        <div className='links'>
          <ul>
            <li>
              <Link href='/'>HOME</Link>
            </li>
            
            <li>
              <Link href='/blog'>BLOG</Link>
            </li>
            <li>
              <Link href='/lists'>LISTS</Link>
            </li>
            <li>
              <Link href='/tasks'>TASKS</Link>
            </li>
            {!isAuthenticated && (
              <li>
                <Link href='/login'>LOGIN</Link>
              </li>
            )}
            {!isAuthenticated && (
              <li>
                <Link href='/register'>REGISTER</Link>
              </li>
            )}
          </ul>
        </div>

        {isAuthenticated && (
          <div className='profile'>
            <button className='profile-button' onClick={showProfile}>PROFILE</button>
          </div>
        )}

        
        {isAuthenticated && (
          <div className='logout'>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        )}
        

        <div className='search-bar'>
          <input
            className='search-query'
            type='text'
            placeholder='Search...'
          />
          <button className='search-button'>🔍</button>
        </div>
      </div>
    </nav>
  );
}
