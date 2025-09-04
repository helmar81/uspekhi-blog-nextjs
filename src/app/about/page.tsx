"use client";

import { ExternalLink } from "lucide-react";
import { Suspense } from "react";

function AboutContent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold font-headline mb-4">About Me</h1>
      <p className="text-lg mb-6">Helmar Baechle</p>

      <div className="mx-auto max-w-screen-md text-left space-y-6">
        <p className="text-base sm:text-lg leading-relaxed">
          As a Level 3 Support Associate at Amazon, I expertly manage complex
          and escalated issues for premium sellers. Outside of work, I'm an avid
          technologist, particularly interested in Astro.js for app development,
          and a seasoned traveler with experience in 72 countries, bringing a
          global perspective to my work. I consistently seek new challenges and
          opportunities for growth, both professionally and personally.
        </p>

        <p className="text-base sm:text-lg leading-relaxed">
          I am also a Creator, Producer, Developer, and everything that comes
          with video, photography, and Web Development. Here are some photos
          which can be downloaded on{" "}
          <a
            href="https://unsplash.com/@uspekhi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            Unsplash
            <ExternalLink className="ml-1 h-4 w-4" />
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <Suspense fallback={<div>Loading About...</div>}>
      <AboutContent />
    </Suspense>
    
  );
}
