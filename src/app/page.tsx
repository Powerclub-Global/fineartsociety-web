"use client"; // Add this directive at the top

import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import FeaturedArtistSection from "@/components/FeaturedArtistSection";
import Newsletter from "@/components/Newsletter";
import PastEvents from "@/components/PastEvents"; // Import PastEvents
import { useEffect, useState } from "react";

export default function Home() {
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    fetch("/events.json")
      .then((response) => response.json())
      .then((data) => setPastEvents(data.pastEvents))
      .catch((error) => console.error("Error loading past events:", error));
  }, []);

  return (
    <div>
      <HeroSection />
      <VideoSection />
      <FeaturedArtistSection />
      <PastEvents events={pastEvents} />
      <Newsletter />
    </div>
  );
}
