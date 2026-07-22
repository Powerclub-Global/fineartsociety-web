"use client"; // Enable client-side rendering

import Image from "next/image";
import Newsletter from "../components/Newsletter"; // Reuse the NewsletterForm
import { useSearchParams } from "next/navigation"; // Use Next.js hook for query params
import { useState } from "react"; // To manage form state and handling submission

// Validation functions
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  // Accepts formats: +1234567890, 123-456-7890, (123) 456-7890, 1234567890
  const phoneRegex = /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

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

  // State for validation errors
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Send SMS notification via SignalWire
      const smsResponse = await fetch("/api/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const smsResult = await smsResponse.json();
      if (smsResult.success) {
        console.log("SMS sent:", smsResult.sid);
        alert("Your message has been sent!");
        setFormData({ name: "", phone: "", email: "", subject: subject, message: "" });
      } else {
        console.error("SMS failed:", smsResult.error);
        alert("An error occurred while sending your message. Please try again.");
      }
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
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md text-black ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-lg text-black" htmlFor="phone">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (123) 456-7890"
                  className={`w-full p-3 border rounded-md text-black ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-lg text-black" htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md text-black ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-lg text-black" htmlFor="subject">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md text-black ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
                  readOnly={!!subject}
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
              </div>
              <div>
                <label className="block text-lg text-black" htmlFor="message">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full p-3 border rounded-md text-black ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
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
