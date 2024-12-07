'use client';

import Link from 'next/link';
import '../styles/navbar.css';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('user');
    setIsAuthenticated(false);
    window.location.href = '/'
  };

  const showProfile = () => {
    window.location.href = '/login';
  };

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
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
              <Link href='/lists'>LISTS</Link>
            </li>
            <li>
              <Link href='/films'>FILMS</Link>
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
            <li>
              <Link href='/track'>TRACK</Link>
            </li>
            {isAuthenticated && (
              <li>
                  <button className='nav-button' onClick={showProfile}>PROFILE</button>
              </li>
            )}
            {isAuthenticated && (
              <li>
                  <button className='nav-button' onClick={handleLogout}>LOGOUT</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
