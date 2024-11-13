"use client"; // Enable client-side rendering

import Image from "next/image";
import Newsletter from "../components/Newsletter"; // Reuse the NewsletterForm
import { useSearchParams } from "next/navigation"; // Use Next.js hook for query params

const ContactPage = () => {
  const searchParams = useSearchParams();
  const artistName = searchParams.get("artist") || "";
  const artworkTitle = searchParams.get("artwork") || "";
  const subject = artistName && artworkTitle ? `Inquiry: ${artistName} - ${artworkTitle}` : "";

  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full h-[calc(100vh-100px)] bg-black text-white flex items-end justify-center">
        <div className="absolute inset-0">
          <Image
            src="/contact.jpg" // Replace with your hero image path
            alt="Contact Us"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className="relative text-center z-10 mb-8 flex flex-col items-center">
         <p className="text-lg sm:text-xl mt-4">
          We would Love to Hear from You
         </p>

          <h1 className="text-4xl sm:text-6xl font-bold uppercase">
            Contact Us
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

      {/* Contact Information Section */}
      <section className="py-16 px-8 sm:px-16 bg-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-black mb-4 uppercase">
              Get in Touch
            </h2>
            <p className="text-lg text-black leading-relaxed">
              Whether you have questions about our gallery, want to inquire about a specific piece, or are interested in collaborating, were here to help.
            </p>
            <div className="mt-6 space-y-4">
              <p className="text-lg text-black">
                <strong className="text-gold">Address:</strong> 123 Fine Art Lane, Miami, FL 33101
              </p>
              <p className="text-lg">
                <strong className="text-gold">Email:</strong> <a href="mailto:collect@fineartsociety.xyz" className="text-black">collect@fineartsociety.xyz</a>
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-black mb-4 uppercase">
              Contact Form
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-lg text-black" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 border border-gray-300 rounded-md text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-lg text-black" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  className="w-full p-3 border border-gray-300 rounded-md text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-lg text-black" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 border border-gray-300 rounded-md text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-lg text-black" htmlFor="subject">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full p-3 border border-gray-300 rounded-md text-black"
                  value={subject}
                  readOnly={!!subject} // Make it read-only if prefilled
                />
              </div>
              <div>
                <label className="block text-lg text-black" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full p-3 border border-gray-300 rounded-md text-black"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-gold border border-gold py-3 rounded-md font-bold uppercase hover:bg-opacity-80 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Newsletter Form */}
      <Newsletter />
    </div>
  );
};

export default ContactPage;
