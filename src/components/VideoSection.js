"use client"; // Client-side rendering

import { useRef } from "react";

const VideoSection = () => {
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video playback failed:", error);
      });
    }
  };

  return (
    <section className="py-16 px-8 sm:px-16 bg-white">
      {/* Video Section */}
      <div className="flex justify-center">
        <video
          ref={videoRef}
          src="/events/spectrum.mp4" // Replace with your video path
          width="600"
          height="300"
          className="object-contain"
          controls
          loop
          playsInline
          onClick={handlePlay} // Play video on click
        />
      </div>
    </section>
  );
};

export default VideoSection;
