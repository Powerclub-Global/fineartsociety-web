"use client"; // Enable client-side rendering

import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import VideoSection from "@/components/VideoSection";
import FeaturedArtistSection from "@/components/FeaturedArtistSection";
import PastEvents from "@/components/PastEvents"; // Correct import path
import Newsletter from "@/components/Newsletter";
import { GoogleAnalytics } from "@next/third-parties/google";

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
      <NavBar />
      <GoogleAnalytics gaId="G-P0KR5923QL" />
      <HeroSection />
      <VideoSection />
      <FeaturedArtistSection />
      <Newsletter />
      {/* Pass events to PastEvents */}
      <PastEvents events={pastEvents} />
      <Footer />
    </div>
  );
}
