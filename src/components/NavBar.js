"use client"; // Enables client-side features

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="relative flex flex-col">
      {/* Top Announcement Bar */}
      <div className="h-8 bg-[#b4914b] flex items-center justify-center">
        <p className="font-cinzel text-white text-xs tracking-wide text-center">
          TIMELESS FINE ART FOR THE MODERN COLLECTOR
        </p>
      </div>

      {/* Main NavBar */}
      <div className="bg-black p-4 flex items-center justify-between relative">
        {/* Logo on the Left */}
        <Link href="/" passHref>
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={40}
            className="cursor-pointer sm:w-[150px] sm:h-[50px]"
          />
        </Link>

        {/* Menu Button (Icon) on the Right */}
        <button
          className="bg-transparent border-none focus:outline-none"
          onClick={toggleMenu}
        >
          <Image
            src="/icon.png"
            alt="Menu Icon"
            width={120}
            height={40}
            className="cursor-pointer sm:w-[150px] sm:h-[60px]"
          />
        </button>
      </div>

      {/* Full-Screen Drawer Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black text-white flex flex-col z-50 pt-16">
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={toggleMenu}
          >
            &times;
          </button>

          {/* Large Icon at the Top of the Drawer */}
          <div className="flex justify-center mb-12">
            <Image
              src="/icon.png"
              alt="Drawer Icon"
              width={400}
              height={200}
              className="sm:w-[400px] sm:h-[160px]"
            />
          </div>

          {/* Centered Menu Items */}
          <div className="flex-grow flex flex-col items-center justify-center space-y-12">
            <ul className="text-center space-y-8 text-5xl font-bold uppercase tracking-wide">
              <li>
                <Link href="/about" onClick={closeMenu}>About</Link>
              </li>
              <li>
                <Link href="/artists" onClick={closeMenu}>Artists</Link>
              </li>
              <li>
                <Link href="/events" onClick={closeMenu}>Events</Link>
              </li>
              <li>
                <Link href="/contact" onClick={closeMenu}>Contact</Link>
              </li>
            </ul>
          </div>

          {/* Social Icons at the Bottom */}
          <div className="flex gap-8 justify-center pb-8">
            <Link href="https://twitter.com" passHref>
              <Image src="/x_icon.png" alt="Twitter" width={32} height={32} />
            </Link>
            <Link href="https://instagram.com" passHref>
              <Image src="/instagram_icon.png" alt="Instagram" width={32} height={32} />
            </Link>
            <Link href="https://facebook.com" passHref>
              <Image src="/facebook_icon.png" alt="Facebook" width={32} height={32} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
