"use client"; // Client-side rendering

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const FeaturedArtistSection = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch("/artists.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched artist data:", data); // Verify the data structure
        setArtists(data.artists.filter((artist) => artist.featured));
      })
      .catch((error) => console.error("Failed to load artist data:", error));
  }, []);

  return (
    <section className="py-16 px-8 sm:px-16 bg-white">
      <h2 className="text-center text-3xl sm:text-4xl font-bold text-black mb-8">
        FEATURED ARTISTS
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
        {artists.map((artist, index) => (
          <Link
            href={`/artist/${encodeURIComponent(artist.name)}`}
            key={index}
            className="relative group block overflow-hidden rounded-lg"
          >
            <Image
              src={artist.image}
              alt={artist.name}
              width={300}
              height={300}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-lg font-bold">{artist.name}</p>
            </div>
          </Link>
        ))}
        {artists.length === 0 && <p>No featured artists available.</p>}
      </div>
      {/* See All Button */}
      <div className="text-center mt-8">
        <Link
          href="/artists"
          className="inline-block bg-black text-gold border border-gold py-3 px-6 rounded-md font-bold uppercase hover:bg-opacity-80 transition"
        >
          See All
        </Link>
      </div>
    </section>
  );
};

export default FeaturedArtistSection;
