"use client"; // Enable client-side rendering

import Image from "next/image";
import Newsletter from "../components/Newsletter"; // Reuse the NewsletterForm
import Link from "next/link";

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full h-[calc(100vh-100px)] bg-black text-white flex items-end justify-center">
        <div className="absolute inset-0">
          <Image
            src="/about.jpg" // Replace with your hero image path
            alt="About Us"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className="relative text-center z-10 mb-8 flex flex-col items-center">
          <p className="text-lg sm:text-xl uppercase mb-2">
            Traditional Fine Art & Modern Technology
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold uppercase">
            About Us
          </h1>
          <div className="mt-4 flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gold animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </section>

      {/* About Section */}
      <section className="py-16 px-8 sm:px-16 bg-white text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-black mb-4 uppercase">
            Who We Are
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Fine Art Society is an innovative gallery redefining the boundaries of art through a seamless blend of physical and virtual experiences. Dedicated to showcasing cutting-edge creativity, the Society serves as a dynamic platform where traditional artistry meets the limitless potential of modern technology.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Known for its bold approach, Fine Art Society provides an immersive environment that captivates audiences both in person and online. From its carefully curated physical exhibitions to its state-of-the-art virtual galleries, the Society offers a unique opportunity to experience art in new and transformative ways.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            At its core, Fine Art Society champions innovation, continuously pushing the boundaries of what art can be. Through live events, exclusive artist collaborations, and an evolving digital marketplace, it empowers artists and collectors to connect and thrive in a rapidly changing world.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Fine Art Society invites you to step into a world where the physical and virtual converge, offering unparalleled access to the future of art. Explore the latest exhibitions and discover the next generation of artistic visionaries today.
          </p>
          <Link href="/contact" passHref>
            <button className="mt-6 bg-black text-gold border border-gold py-3 px-6 rounded-md font-bold uppercase hover:bg-opacity-80 transition">
              Contact Us
            </button>
          </Link>
        </div>
      </section>

      {/* Our Founder Section */}
      <section className="py-16 px-8 sm:px-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-black mb-8 text-center uppercase">Our Founder</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center">
            <Image
              src="/founder.jpg" // Replace with the founder's photo path
              alt="Jessy Artman"
              width={200}
              height={200}
              className="rounded-full border-2 border-gold"
            />
            <h3 className="text-lg font-bold text-black mt-4 text-center">
              Jessy Artman
            </h3>
            <p className="text-gray-700 text-center">Owner | Curator</p>
          </div>
          <div className="text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              Jessy Artman, founder of Fine Art Society, is redefining the art world by bridging physical masterpieces with blockchain technology. Hosting exhibitions in iconic venues like the Versace Mansion and the Harvard Club, Jessy curates exclusive collections while pioneering a new era of transparent and secure art ownership through tokenization.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              His innovative vision positions Fine Art Society at the forefront of the global art and tech revolution.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Form */}
      <Newsletter />
    </div>
  );
};

export default AboutPage;
