import Navbar from './components/navbar';
import '/src/app/styles/page.css';
export default function Home() {
  return (
    <div className='main'>
      <Navbar/>
      <div className='trending-movie'>
        <img src='/banner.jpg' alt='A Trending Movie'></img>
      </div>

      <div className='sell'>
        <p>The one site for <br/> all things Movie.</p>
      </div>

      <div className='intro'>
        <p>CineVerse lets you ...</p>
        <div className='features'>
          <div className='feature'>
            <p>Keep track of every film you've ever watched (or just start from the 
              day you join)</p>
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
      </div>

      <div>
        <p></p>
      </div>

    </div>
  );
}