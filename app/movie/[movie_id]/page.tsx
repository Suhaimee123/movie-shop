'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getMovieDetail } from '@/app/api/movieApi';
import Navbar from '@/components/ui/Navbar';
import Image from 'next/image';
import { getAccountDetails } from '@/app/api/accountApi';
import { MovieDetail } from '@/type/Movie';

export default function MovieDetailPage() {
  const { movie_id } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);


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
    const fetchMovie = async () => {
      if (movie_id) {
        const res = await getMovieDetail(movie_id as string);
        setMovie(res.data);
      }
    };
    fetchMovie();
  }, [movie_id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <>
      <Navbar avatarUrl={avatar} />
      <div className="relative w-full h-[70vh] flex items-end bg-black">
        {/* Backdrop */}
        {movie.backdrop_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            width={500}
            height={750}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-700" />
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        {/* Movie Info Overlay */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-12 text-white">
          <h1 className="text-5xl font-bold mb-2">{movie.title}</h1>
          {movie.tagline && (
            <p className="italic text-lg text-gray-300 mb-4">&quot;{movie.tagline}&quot;</p>
          )}
          <p className="text-base text-gray-200 line-clamp-3">{movie.overview}</p>

          {/* Metadata */}
          <div className="flex space-x-6 mt-4 text-sm text-gray-300">
            <span>⭐ {movie.vote_average} / 10</span>
            <span>⏰ {movie.runtime} mins</span>
            <span>🎥 {movie.genres.map((g) => g.name).join(', ')}</span>
            </div>

          {/* CTA Button */}
          <div className="mt-6">
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold shadow">
              ▶️ Watch Trailer
            </button>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className=" mx-auto p-6 space-y-6 text-white bg-black">
        <h2 className="text-2xl font-bold">More Details</h2>
        <div className="m-5 p-6 space-y-2 text-sm text-gray-300">
          <p>📅 Release Date: {movie.release_date}</p>
          <p>💰 Budget: ${movie.budget.toLocaleString()}</p>
          <p>💵 Revenue: ${movie.revenue.toLocaleString()}</p>
          <p>🏳️ Country: {movie.production_countries.map((c) => c.name).join(', ')}</p>
          <p>🌐 Website: {movie.homepage ? <a href={movie.homepage} className="underline hover:text-blue-400" target="_blank">Visit</a> : 'N/A'}</p>
        </div>
      </div>


    </>
  );
}
