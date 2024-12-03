'use client';

import Link from 'next/link';
import '../styles/navbar.css';

export default function Navbar() {

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    window.location.href='/login';
};

  return (
    <nav className='navbar'>
      <div className='container'>
        <div className='logo'>
          <span>CineVerse</span>
        </div>

        <div className='links'>
          <ul>
            <li>
              <Link href='/'>HOME</Link>
            </li>
            <li>
              <Link href='/login'>LOGIN</Link>
            </li>
            <li>
              <Link href='/register'>REGISTER</Link>
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
          </ul>
        </div>


        <div className='create'>
          <button className='create-button'>+ CREATE</button>
        </div>

        <div className='logout'>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>

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
