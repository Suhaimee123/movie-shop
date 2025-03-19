'use client';

import { useEffect, useState } from 'react';
import { getPopularMovies, getNowPlayingMovies, getTopRated, searchMovies } from '@/app/api/movieApi';
import MovieCard from '@/components/ui/MovieCard';
import Navbar from '@/components/ui/Navbar';
import { getAccountDetails } from './api/accountApi';
import { Movie } from '@/type/Movie';



export default function Home() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);



  useEffect(() => {
    const fetchAccount = async () => {
      const res = await getAccountDetails(21890670);
      const path = res.data.avatar?.tmdb?.avatar_path;
      if (path) {
        setAvatar(`https://image.tmdb.org/t/p/w200${path}`);
      }
    };
    fetchAccount();
  }, []);

  useEffect(() => {
    if (!searchTerm) {  // Fetch categories only if there is no search term
      const fetchMovies = async () => {
        const popular = await getPopularMovies(1);
        const nowPlaying = await getNowPlayingMovies(1);
        const topRated = await getTopRated(1);
        setPopularMovies(popular.data.results.map(mapMovie));
        setNowPlayingMovies(nowPlaying.data.results.map(mapMovie));
        setTopRatedMovies(topRated.data.results.map(mapMovie));
      };
      fetchMovies();
    }
  }, [searchTerm]);  // Dependency on searchTerm to control fetching

  useEffect(() => {
    if (searchTerm) {
      const fetchSearchResults = async () => {
        const res = await searchMovies(searchTerm);
        setSearchResults(res.data.results.map(mapMovie));
      };
      fetchSearchResults();
    }
  }, [searchTerm]);

  const mapMovie = (movie: Movie): Movie => ({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    vote_average: movie.vote_average,
    release_date: movie.release_date,
    price: Math.floor(Math.random() * 200) + 100,
  });


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


  const handleAddToCart = (movie: Movie) => {
    const existingCart = localStorage.getItem('cart');
    const cart = existingCart ? JSON.parse(existingCart) : [];
    if (!cart.some((item: Movie) => item.id === movie.id)) {
      const updatedCart = [...cart, movie];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cartItems: updatedCart } }));

      // ✅ กรณีเพิ่มสำเร็จ
      setPopupMessage('✅ เพิ่มสินค้าเข้าตะกร้าสำเร็จ!');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } else {
      // ⚠️ กรณีซ้ำ
      setPopupMessage('⚠️ สินค้านี้อยู่ในตะกร้าแล้ว!');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };








  return (
    <>
      <Navbar avatarUrl={avatar} />
      <div className="max-w-7xl mx-auto p-6">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search for movies..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="mb-4 px-4 py-2 border rounded"
            />
          </div>
        </div>

        {searchTerm && (
          <>
            <h1 className="text-3xl font-bold mb-6">🎬 Search Results</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.map((movie) => (
                <MovieCard
                  key={movie.id}
                  {...movie}
                  onAddToCart={() => console.log('Added to cart:', movie)}
                />
              ))}
            </div>
          </>
        )}
        {!searchTerm && (
          <>
            <MovieSection title="🎬 Popular Movies" movies={popularMovies} onAddToCart={handleAddToCart} />
            <MovieSection title="🎬 Now Playing" movies={nowPlayingMovies} onAddToCart={handleAddToCart} />
            <MovieSection title="🎬 Top Rated" movies={topRatedMovies} onAddToCart={handleAddToCart} />
          </>
        )}

        {showPopup && popupMessage && (
          <div className={`fixed bottom-4 right-4 ${popupMessage.includes('⚠️') ? 'bg-yellow-800' : 'bg-green-600'} text-white px-4 py-2 rounded shadow-lg z-50`}>
            {popupMessage}
          </div>
        )}


      </div>
    </>
  );
}

function MovieSection({ title, movies, onAddToCart }: { title: string; movies: Movie[]; onAddToCart: (movie: Movie) => void }) {
  return (
    <>
      <div className="border border-gray-300 rounded-lg p-4 my-6 shadow"> {/* Updated line */}
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              {...movie}
              onAddToCart={() => onAddToCart(movie)}
            />
          ))}
        </div>
      </div>
    </>
  );
}







