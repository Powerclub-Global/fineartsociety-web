"use client"; // Client-side rendering

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Newsletter from "../../components/Newsletter";

const FineArtPage = () => {
  const [artwork, setArtwork] = useState(null);
  const [relatedArtworks, setRelatedArtworks] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  const { id, artistName } = router.query;

  useEffect(() => {
    if (id && artistName) {
      fetch("/artists.json")
        .then((response) => response.json())
        .then((data) => {
          const selectedArtist = data.artists.find(
            (artist) => artist.name === artistName
          );

          if (selectedArtist) {
            let selectedArtwork = null;
            let related = [];
            selectedArtist.collections.forEach((collection) => {
              const foundArtwork = collection.items.find(
                (item) => item.seoTag === id
              );
              if (foundArtwork) {
                selectedArtwork = foundArtwork;
                related = collection.items.filter(
                  (item) => item.seoTag !== id
                );
              }
            });

            setArtwork(selectedArtwork);
            setRelatedArtworks(related);
          }
        })
        .catch((error) => console.error("Error fetching artist data:", error));
    }
  }, [id, artistName]);

  const handlePrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? relatedArtworks.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentSlide((prev) =>
      prev === relatedArtworks.length - 1 ? 0 : prev + 1
    );
  };

  if (!artwork) {
    return <p className="text-center py-16">Loading artwork details...</p>;
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 px-8 sm:px-16 bg-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <Image
            src={artwork.image}
            alt={artwork.title}
            width={600}
            height={800}
            className="object-cover w-full rounded-lg"
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-black mb-4">
              {artwork.title}
            </h1>
            <p className="text-lg text-gray-700 mb-2">
              <strong className="uppercase">Artist:</strong> {artistName}
            </p>
            <p className="text-lg text-gray-700 mb-2">
              <strong className="uppercase">Year:</strong> {artwork.year}
            </p>
            <p className="text-lg text-gray-700 mb-2">
              <strong className="uppercase">Medium:</strong> {artwork.medium}
            </p>
            <p className="text-lg text-gray-700 mb-2">
              <strong className="uppercase">Dimensions:</strong>{" "}
              {artwork.dimensions}
            </p>
            <p className="text-lg text-gray-700 mb-2">
              <strong className="uppercase">Edition:</strong> {artwork.edition}
            </p>
            <Link
  href={{
    pathname: "/contact",
    query: {
      artist: artistName,
      artwork: artwork.title,
    },
  }}
  passHref
>
  <button className="mt-6 bg-black text-gold border border-gold py-3 px-6 rounded-md font-bold uppercase hover:bg-gray-800 transition">
    Inquire
  </button>
</Link>

          </div>
        </div>
      </section>

      {/* Related Artworks Carousel */}
      {relatedArtworks.length > 0 && (
        <section className="py-16 px-8 sm:px-16 bg-gray-100">
          <div className="container mx-auto">
          <h2 className="text-center text-3xl font-bold text-black mb-8 uppercase">
            Other Artworks by {artistName}
          </h2>

            <div className="relative overflow-hidden">
              <div className="flex transition-transform ease-in-out duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {relatedArtworks.map((art, index) => (
                  <div key={index} className="min-w-full px-4">
                    <Link
                      href={`/fineart/${art.seoTag}?artistName=${artistName}`}
                      passHref
                    >
                      <div className="relative group overflow-hidden rounded-lg cursor-pointer">
                        <Image
                          src={art.image}
                          alt={art.title}
                          width={300}
                          height={400}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-white text-lg font-bold">
                            {art.title}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              <button onClick={handlePrev} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full">‹</button>
              <button onClick={handleNext} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full">›</button>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Form */}
      <Newsletter />
    </div>
  );
};

export default FineArtPage;
