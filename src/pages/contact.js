"use client"; // Enable client-side rendering

import Image from "next/image";
import Newsletter from "../components/Newsletter"; // Reuse the NewsletterForm
import { useSearchParams } from "next/navigation"; // Use Next.js hook for query params
import { useState } from "react"; // To manage form state and handling submission
import { Client, Databases, ID } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('669cf82100212276b67e');

const databases = new Databases(client);

const collectionId = '6751716a0028ce69d559'; // Your collection ID
const databaseId = 'pcg_database'; // Replace with your actual database ID

const ContactPage = () => {
  const searchParams = useSearchParams();
  const artistName = searchParams.get("artist") || "";
  const artworkTitle = searchParams.get("artwork") || "";
  const subject = artistName && artworkTitle ? `Inquiry: ${artistName} - ${artworkTitle}` : "";

  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: subject,
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("IN here");
    try {
      const response = await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(), // Automatically generate a unique ID for the document
        formData
      );
      console.log('Form submitted successfully:', response);
      alert("Your message has been sent!");
      setFormData({ name: "", phone: "", email: "", subject: subject, message: "" }); // Reset form
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("An error occurred while sending your message. Please try again.");
    }
  };

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
              Whether you have questions about our gallery, want to inquire about a specific piece, or are interested in collaborating, we’re here to help.
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-lg text-black" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md text-black"
                  readOnly={!!subject} // Make it read-only if prefilled
                />
              </div>
              <div>
                <label className="block text-lg text-black" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
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
