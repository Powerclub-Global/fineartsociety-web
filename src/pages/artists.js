"use client"; // Client-side rendering

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Newsletter from "../components/Newsletter";

const ArtistsPage = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch("/artists.json") // Replace with your actual path
      .then((response) => response.json())
      .then((data) => {
        setArtists(data.artists);
      })
      .catch((error) => console.error("Error loading artists:", error));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">

      {/* Main Content */}
      <main className="flex-grow py-16 px-8 sm:px-16 bg-white">
        <h1 className="text-4xl text-black font-bold text-center mb-8">OUR ARTISTS</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist, index) => (
            <Link key={index} href={`/artist/${artist.name}`} passHref>
              <div className="group relative cursor-pointer overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xl font-bold">{artist.name}</p>
                </div>
              </div>
            </Link>
          ))}
          {artists.length === 0 && (
            <p className="text-center text-lg">No artists available.</p>
          )}
        </div>
      </main>
      <Newsletter />
    </div>
  );
};

export default ArtistsPage;
