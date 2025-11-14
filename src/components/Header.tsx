'use client';

import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { trackSearchSubmitted } from '@/lib/rudderstack';

export default function Header() {
  const cart = useStore((state) => state.cart);
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      trackSearchSubmitted(searchQuery, 0);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-dark border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            <span className="text-primary">ZILO</span>
            <span className="text-white">.CLONE</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/collections/men-clothing" className="hover:text-primary transition">
              Men
            </Link>
            <Link href="/collections/women-clothing" className="hover:text-primary transition">
              Women
            </Link>
            <Link href="/collections/accessories" className="hover:text-primary transition">
              Accessories
            </Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:block flex-1 max-w-md mx-8">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray text-white border border-gray-700 focus:border-primary focus:outline-none"
            />
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            {user ? (
              <div className="relative group">
                <button className="hover:text-primary transition">
                  {user.name}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-gray rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link
                    href="/account"
                    className="block px-4 py-2 hover:bg-gray-700 rounded-t-lg"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-b-lg"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="hover:text-primary transition">
                Login
              </Link>
            )}

            <Link href="/cart" className="relative hover:text-primary transition">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <form onSubmit={handleSearch} className="mb-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray text-white border border-gray-700 focus:border-primary focus:outline-none"
              />
            </form>
            <nav className="flex flex-col space-y-4">
              <Link
                href="/collections/men-clothing"
                className="hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Men
              </Link>
              <Link
                href="/collections/women-clothing"
                className="hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Women
              </Link>
              <Link
                href="/collections/accessories"
                className="hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Accessories
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
