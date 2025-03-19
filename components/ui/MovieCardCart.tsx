import Link from "next/link";
import Image from 'next/image';
import { MovieCardCartProps } from "@/type/Movie";


  export default function MovieCardCart({
    id,
    title,
    poster_path,
    vote_average,
    release_date,
    price,
    selected,
    onSelect,
    onCardAction
  }: MovieCardCartProps) {
    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">

      <div 
        className={`bg-white shadow-md rounded-lg overflow-hidden relative cursor-pointer ${
          selected ? 'ring-2 ring-green-500' : ''
        }`}
        onClick={onSelect}
      >
        {/* รูปภาพ */}
        {poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            width={500}
            height={750}
            className="w-full h-64 object-cover"
          />        ) : (
          <div className="w-full h-64 bg-gray-300 flex items-center justify-center">No Image</div>
        )}
  
        <div className="p-4">
          {/* กด link เฉพาะที่ title */}
          <Link href={`/movie/${id}`}>
            <h2
              className="text-lg font-semibold mb-1 hover:text-blue-700 cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              {title}
            </h2>
          </Link>
  
          <p className="text-sm text-gray-600">⭐ {vote_average} / 10</p>
          <p className="text-sm text-gray-600">📅 {release_date}</p>
          <p className="text-sm font-bold my-2">฿ {price} THB</p>
  
          {/* ปุ่ม Remove */}
          <button
            onClick={(e) => { e.stopPropagation(); onCardAction(); }}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      </div>
      </div>
    );
  }
  