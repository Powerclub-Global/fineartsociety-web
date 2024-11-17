"use client"; // Enable client-side rendering

import Image from "next/image"; // Correct use of Next.js Image component

const HeroSection = () => {
  const logos = ["/logo1.png", "/logo2.png", "/logo3.png", "/logo4.png", "/logo5.png"];

  return (
    <div className="relative w-full h-[calc(100vh-100px)]">
      {/* Image Background */}
      <Image
        src="/gallery.png"
        alt="Virtual Gallery"
        className="absolute top-0 left-0 w-full h-full object-cover"
        layout="fill"
        priority
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black opacity-25"></div>

      {/* Text Overlay */}
      <div className="absolute inset-x-0 top-[42%] transform -translate-y-1/2 text-center text-gold">
        <h1 className="text-6xl sm:text-8xl font-bold uppercase leading-tight">
          Experience
        </h1>
        <h1 className="text-6xl sm:text-8xl font-bold uppercase leading-tight mt-20">
          Modern
        </h1>
        <h1 className="text-6xl sm:text-8xl font-bold uppercase leading-tight mt-20 mb-16">
          Fine Art
        </h1>
      </div>

      {/* Call to Action */}
      <div className="absolute bottom-40 w-full flex justify-center">
        <a
          href="https://www.spatial.io/s/FINE-ART-SOCIETY-673968c70934a7f92fede60b" // Calendly URL
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-gold font-bold border border-gold rounded-md px-8 py-4 hover:bg-opacity-80"
        >
          <div className="text-lg">ENTER THE VIRTUAL GALLERY</div>
        </a>
      </div>

      {/* Logo Slider */}
      <div className="absolute bottom-0 w-full bg-black h-28 flex overflow-hidden">
        <div
          className="flex w-max animate-scroll"
          style={{
            animation: `scroll 8s linear infinite`,
          }}
        >
          {logos.concat(logos).map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-1/3 flex justify-center items-center"
            >
              <Image src={logo} alt={`Logo ${index + 1}`} width={80} height={80} />
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
