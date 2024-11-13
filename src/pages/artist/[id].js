"use client"; // Client-side rendering

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Newsletter from "../../components/Newsletter";

const Artist = () => {
  const [artist, setArtist] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch("/artists.json")
        .then((response) => response.json())
        .then((data) => {
          const selectedArtist = data.artists.find(
            (artist) => artist.name === id
          );
          setArtist(selectedArtist || null);
        })
        .catch((error) => console.error("Error fetching artist data:", error));
    }
  }, [id]);

  if (!artist) {
    return <p className="text-center py-16">Loading artist details...</p>;
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 px-8 sm:px-16 bg-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <Image
            src={artist.image}
            alt={artist.name}
            width={500}
            height={500}
            className="object-cover w-full rounded-lg"
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-black">{artist.name}</h1>
            <p className="text-lg text-gray-700 mt-4">{artist.bio}</p>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      {artist.collections?.map((collection, collectionIndex) => (
        <section
          key={collectionIndex}
          className={`py-16 px-8 sm:px-16 ${
            collectionIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
          }`}
        >
          <div className="container mx-auto">
            <h2 className="text-center text-3xl font-bold text-black mb-8">
              {collection.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {collection.items.map((item, index) => (
                <Link
                  key={index}
                  href={`/fineart/${item.seoTag}?artistName=${artist.name}`}
                  passHref
                >
                  <div className="relative group overflow-hidden rounded-lg cursor-pointer">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-lg font-bold">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Biography Section */}
      {artist.biography && (
        <section className="py-16 px-8 sm:px-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-center text-3xl font-bold text-black mb-8 uppercase">
            Biography
          </h2>
          <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {artist.biography.split("\n\n").map((paragraph, index) => (
              <p key={index} className="indent-8 mb-6">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
      
      )}

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default Artist;
