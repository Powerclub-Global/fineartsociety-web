"use client"; // Enable client-side rendering

import { useEffect, useState } from "react";
import Image from "next/image";
import Newsletter from "../components/Newsletter";
import PastEvents from "../components/PastEvents"; // Import the component

const EventsPage = () => {
  const upcomingEvents = [
    {
      title: "BIT TITANS: Bitcoin Mining Reception by Asic Jungle",
      date: "December 9, 2024",
      time: "6:00 PM - 10:00 PM",
      location: "Shang Ri La Resort, Abu Dhabi",
      description:
        "​Join us for an exclusive evening of networking and innovation at the Abu Dhabi Bitcoin Mining VIP Event, where the industry leaders in bitcoin meet. This event will bring together global leaders, investors, and pioneers in the Bitcoin mining industry for a high-level exchange of ideas, insights, and opportunities.",
      image: "/event1.png", // Replace with your image path
      url: "https://lu.ma/huiskh02", // Link for the Learn More button
    },
  ];

  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    fetch("/events.json")
      .then((response) => response.json())
      .then((data) => setPastEvents(data.pastEvents))
      .catch((error) => console.error("Error loading past events:", error));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full h-[calc(100vh-100px)] bg-black text-white flex items-end justify-center">
        <div className="absolute inset-0">
          <Image
            src="/events.jpg"
            alt="Events"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className="relative text-center z-10 mb-8 flex flex-col items-center">
          <p className="text-lg sm:text-xl uppercase mb-2">
            Join Us in Celebrating Art & Innovation
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold uppercase">
            Discover Experiences
          </h1>
        </div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 px-8 sm:px-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-black mb-8 text-center uppercase">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg shadow-lg overflow-hidden"
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  width={400}
                  height={250}
                  className="object-cover w-full h-48"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-black mb-2">
                    {event.title}
                  </h3>
                  <p className="text-lg text-gray-700">
                    <strong>Date:</strong> {event.date}
                  </p>
                  <p className="text-lg text-gray-700">
                    <strong>Time:</strong> {event.time}
                  </p>
                  <p className="text-lg text-gray-700">
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p className="text-gray-700 mt-4">{event.description}</p>
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full bg-black text-gold border border-gold py-2 rounded-md font-bold uppercase hover:bg-opacity-80 transition block text-center"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events Section */}
      <PastEvents events={pastEvents} />

      {/* Newsletter Form */}
      <Newsletter />
    </div>
  );
};

export default EventsPage;
