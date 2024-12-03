import Navbar from './components/navbar';
import './styles/page.css';

export default function Home() {
  return (
    <div className='main'>
      <Navbar/>
      <div className='banner'>
        <img src='/banner.jpg' alt='A Banner'></img>
      </div>

      <div className='sell'>
        <p>Everything Cinema<br/> At one place.</p>
      </div>

        <div className='features'>
          <div className='feature'>
            <p>Keep track of every film you've ever watched (or just start from when
              you join)</p>
          </div>
          <div className='feature'>
            <p>Write and share reviews, and follow friends
              and other members to read theirs
            </p>
          </div>
          <div className='feature'>
            <p>Rate each film on a five-star scale (with halves) to record
              and share your reaction
            </p>
          </div>
          <div className='feature'>
            <p>Compile and share lists of films on any topic
              and keep a watchlist of films to see
            </p>
          </div>
        </div>

      <div>
        <p></p>
      </div>

    </div>
  );
}