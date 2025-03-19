// components/Navbar.tsx
import Link from 'next/link';

interface NavbarProps {
  avatarUrl?: string | null;
}

export default function Navbar({ avatarUrl }: NavbarProps) {
  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold">
          🎥 Movie Shop
        </div>
        <div className="space-x-6 hidden md:flex items-center">
          <Link href="/" className="hover:text-yellow-400 transition">Home</Link>
          <Link href="#" className="hover:text-yellow-400 transition">Popular</Link>
          <Link href="#" className="hover:text-yellow-400 transition">Cart</Link>
          <Link href="/account" className="hover:text-yellow-400 transition">Account</Link>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover border border-white"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center">
              <span className="text-sm">?</span>
            </div>
          )}
        </div>
        <div className="md:hidden">
          <button>☰</button>
        </div>
      </div>
    </nav>
  );
}
