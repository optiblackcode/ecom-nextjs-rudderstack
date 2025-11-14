import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RudderStackProvider from '@/components/RudderStackProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ZILO Clone - Fast Delivery Fashion Store',
  description: 'Shop the latest fashion with same-day delivery',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RudderStackProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </RudderStackProvider>
      </body>
    </html>
  );
}
