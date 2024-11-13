"use client"; // Enable client-side rendering

import Image from "next/image";

const Footer = () => {
  const yellowColor = "#b4914b"; // Gold color
  const whiteColor = "#ffffff"; // White for subtext
  const brownColor = "#000000"; // Brown background color

  return (
    <footer
      style={{ backgroundColor: brownColor, borderTop: `2px solid ${yellowColor}` }}
      className="p-8"
    >
      <div className="flex flex-col items-center gap-8">
        {/* Larger Logo */}
        <div>
          <Image
            src="/icon.png" // Update to actual logo path
            alt="Logo"
            width={300}
            height={250}
            priority
          />
        </div>

        {/* Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {buildFooterText(
            "ADDRESS:",
            "223 West Grand Ave, Ponca City, OK 74601",
            yellowColor,
            whiteColor
          )}
          {buildFooterText("HOURS:", getHours(), yellowColor, whiteColor)}
          {buildFooterText(
            "EMAIL:",
            "collect@fineartsociety.xyz",
            yellowColor,
            whiteColor
          )}
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4 mt-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Image
              src="/x_icon.png" // Replace with actual path to X (Twitter) icon
              alt="Twitter"
              width={32}
              height={32}
            />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Image
              src="/instagram_icon.png" // Replace with actual path to Instagram icon
              alt="Instagram"
              width={32}
              height={32}
            />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Image
              src="/facebook_icon.png" // Replace with actual path to Facebook icon
              alt="Facebook"
              width={32}
              height={32}
            />
          </a>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-4">
          <p style={{ color: yellowColor }} className="text-[11px] font-cinzel">
            Powerclub Global LLC© 2024
          </p>
          <p style={{ color: brownColor }} className="text-[5px] font-cinzel">
            Designed and Developed by powerclubglobal.com | Email: innovate@powerclubglobal.com
          </p>
        </div>
      </div>
    </footer>
  );
};

// Helper function for Footer Text
const buildFooterText = (title, content, titleColor, contentColor) => {
  return (
    <div>
      <p
        style={{ color: titleColor }}
        className="font-pd text-sm font-bold text-center"
      >
        {title}
      </p>
      <p
        style={{ color: contentColor }}
        className="font-cinzel text-sm whitespace-pre-wrap text-center"
      >
        {content}
      </p>
    </div>
  );
};

// Function to get Hours
const getHours = () => {
  return `
Sunday: CLOSED
Monday: 9 AM – 5 PM
Tuesday: 9 AM – 5 PM
Wednesday: 9 AM – 5 PM
Thursday: 9 AM – 5 PM
Friday: 9 AM – 5 PM
Saturday: CLOSED
`;
};

export default Footer;
