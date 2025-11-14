import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray border-t border-gray-800 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">
              <span className="text-primary">ZILO</span>
              <span>.CLONE</span>
            </h3>
            <p className="text-gray-400 text-sm">
              Fast delivery fashion store. Shop the latest trends with same-day delivery.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/collections/men-clothing" className="hover:text-primary transition">
                  Men's Clothing
                </Link>
              </li>
              <li>
                <Link href="/collections/women-clothing" className="hover:text-primary transition">
                  Women's Clothing
                </Link>
              </li>
              <li>
                <Link href="/collections/accessories" className="hover:text-primary transition">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/contact" className="hover:text-primary transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-primary transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-primary transition">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Delivery Info */}
          <div>
            <h4 className="font-semibold mb-4">Fast Delivery</h4>
            <p className="text-sm text-gray-400 mb-2">
              60 Minutes to 2 Hours
            </p>
            <p className="text-sm text-gray-400 mb-2">
              Same Day Delivery
            </p>
            <p className="text-sm text-gray-400">
              Next Day Delivery
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} ZILO Clone. All rights reserved.</p>
          <p className="mt-2">Built with Next.js and RudderStack Analytics</p>
        </div>
      </div>
    </footer>
  );
}
