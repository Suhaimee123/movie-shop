import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface NavbarProps {
  avatarUrl?: string | null;
}

export default function Navbar({ avatarUrl }: NavbarProps) {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);


  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length);
    };

    // โหลดครั้งแรก
    updateCartCount();

    // ฟังทั้ง 2 event: storage (กรณี tab อื่น) + custom cartUpdated (ใน tab เดียวกัน)
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);
  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/" className="hover:text-yellow-400 transition">🎥 Movie Shop</Link>
        </div>

        {/* Desktop Menu */}
        <div className="space-x-6 hidden md:flex items-center">
          <Link href="/popula" className="hover:text-yellow-400 transition">Popular</Link>
          <Link href="/now" className="hover:text-yellow-400 transition">Now</Link>
          <Link href="/top" className="hover:text-yellow-400 transition">Top Rated</Link>
          <Link href="/account" className="hover:text-yellow-400 transition">Account</Link>
          <Link href="/cart" className="hover:text-yellow-400 transition relative">
            <FontAwesomeIcon icon={faShoppingCart} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-700 text-white text-xs rounded-full px-2 py-0.5">{cartCount}</span>
            )}
          </Link>
          {avatarUrl ? (
            <img src={avatarUrl} alt="avatar" className="w-8 h-8 rounded-full object-cover border border-white" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center">
              <span className="text-sm">?</span>
            </div>
          )}
        </div>

        {/* Hamburger for mobile */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 text-white px-4 py-3 space-y-2">
          <Link href="/popula" className="block hover:text-yellow-400 transition">Popular</Link>
          <Link href="/now" className="block hover:text-yellow-400 transition">Now</Link>
          <Link href="/top" className="block hover:text-yellow-400 transition">Top Rated</Link>
          <Link href="/account" className="block hover:text-yellow-400 transition">Account</Link>
          <Link href="/cart" className="block hover:text-yellow-400 transition flex items-center">
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
            Cart {cartCount > 0 && (
              <span className="ml-2 bg-red-700 text-white text-xs rounded-full px-2 py-0.5">{cartCount}</span>
            )}
          </Link>
        </div>
      )}
    </nav>

  );
}
