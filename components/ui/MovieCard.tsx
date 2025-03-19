

import Link from 'next/link';
import Image from 'next/image';
import { MovieCardProps } from '@/type/Movie';
export default function MovieCard({
  id,
  title,
  poster_path,
  vote_average,
  release_date,
  price,
  onAddToCart,
}: MovieCardProps) {
  const movie = { id, title, poster_path, vote_average, release_date, price };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
      {/* Link รอบรูป */}
      <Link href={`/movie/${id}`}>
        {poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            width={500}
            height={750}
            className="w-full h-64 object-cover"
          />
        ) : (
          <div className="w-full h-72 bg-gray-300 flex items-center justify-center cursor-pointer">
            <span className="text-gray-600">No Image</span>
          </div>
        )}
      </Link>

      <div className="p-4">
        {/* Link รอบชื่อหนัง */}
        <Link href={`/movie/${id}`}>
          <h2 className="text-lg font-semibold mb-1 hover:text-blue-700 cursor-pointer">{title}</h2>
        </Link>

        <p className="text-sm text-gray-600">⭐ {vote_average} / 10</p>
        <p className="text-sm text-gray-600">📅 {release_date}</p>
        <p className="text-sm font-bold my-2">฿ {price} THB</p>
        <button
          onClick={() => onAddToCart(movie)}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

