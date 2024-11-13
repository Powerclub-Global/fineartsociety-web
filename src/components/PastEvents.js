"use client"; // Enable client-side rendering

import { useState, useEffect } from "react";

const PastEvents = ({ events = [] }) => { // Default to an empty array
  const [visibleEvents, setVisibleEvents] = useState(0);
  const [isMoreVisible, setIsMoreVisible] = useState(false);

  useEffect(() => {
    setVisibleEvents(window.innerWidth >= 768 ? 6 : 3); // Show 6 on desktop, 3 on mobile

    const handleResize = () => {
      setVisibleEvents(window.innerWidth >= 768 ? 6 : 3);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadMoreEvents = () => {
    setVisibleEvents((prev) => {
      const nextVisible = prev + (window.innerWidth >= 768 ? 6 : 3);
      setIsMoreVisible(nextVisible < events.length);
      return nextVisible;
    });
  };

  useEffect(() => {
    setIsMoreVisible(visibleEvents < events.length);
  }, [events, visibleEvents]);

  return (
    <section className="py-16 px-8 sm:px-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-black mb-8 text-center uppercase">
          Past Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.slice(0, visibleEvents).map((event, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-lg overflow-hidden"
            >
              <video
                width="100%"
                height="250"
                controls
                poster="/placeholder.jpg" // Optional poster for initial load
                src={event.videoUrl}
              ></video>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-black mb-2">
                  {event.title}
                </h3>
                <p className="text-lg text-gray-700">
                  <strong>Date:</strong> {event.date}
                </p>
                <p className="text-lg text-gray-700">
                  <strong>Location:</strong> {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>
        {isMoreVisible && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMoreEvents}
              className="bg-black text-gold border border-gold py-3 px-6 rounded-md font-bold uppercase hover:bg-opacity-80 transition"
            >
              See More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PastEvents;
