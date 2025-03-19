interface MovieCardProps {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  price: number;

  onAddToCart: () => void;
}

export default function MovieCard({
  id,
  title,
  poster_path,
  vote_average,
  release_date,
  price,

  onAddToCart,
}: MovieCardProps) {
  return (
    <div
      key={id}
      className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
    >
      {poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className="w-full h-72 object-cover"
        />
      ) : (
        <div className="w-full h-72 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-600">No Image</span>
        </div>
      )}

      <div className="p-4">
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <p className="text-sm text-gray-600 mb-1">⭐ {vote_average} / 10</p>
        <p className="text-sm text-gray-600 mb-4">Price: {price} THB</p>
        <p className="text-xs text-gray-500 mb-4">📅 {release_date}</p>
        <button
          onClick={onAddToCart}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
