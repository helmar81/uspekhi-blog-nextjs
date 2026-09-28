"use client";

import { ExternalLink } from "lucide-react";
import { Suspense } from "react";

function AboutContent() {
  // JSON-LD Schema for AI Visibility (SEO)
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Helmar Baechle",
    url: "https://uspekhi.web.app/about",
    jobTitle: "Level 3 Support Associate",
    worksFor: {
      "@type": "Organization",
      name: "Amazon",
    },
    knowsAbout: [
      "Google Cloud Platform",
      "Docker",
      "Firebase",
      "n8n",
      "AI Stack",
      "Astro.js",
      "Next.js",
      "React",
    ],
    description:
      "Level 3 Support Associate at Amazon, Full-Stack Developer, and Creator with experience in 72 countries.",
    sameAs: [
      "https://unsplash.com/@uspekhi",
      // Add your LinkedIn or GitHub URL here if available
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Inject Schema for AI/SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <h1 className="text-4xl font-bold font-headline mb-4">About Me</h1>
      <p className="text-lg mb-8 font-medium text-gray-700 dark:text-gray-300">
        Helmar Baechle
      </p>

      <div className="mx-auto max-w-screen-md text-left space-y-10">
        
        {/* Section 1: Professional Expertise */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Professional Expertise
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Currently, I serve as a <strong>Level 3 Support Associate at Amazon</strong>,
            where I expertly manage complex, high-priority escalations for
            premium sellers. My role requires deep analytical problem-solving and
            the ability to navigate intricate technical ecosystems under
            pressure.
          </p>
        </section>

        {/* Section 2: Tech Stack */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Technical Stack & Innovation
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
            I am an avid technologist constantly exploring the edge of web
            development and automation. My current core stack includes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-gray-700 dark:text-gray-300 ml-4">
            <li>
              <span className="font-semibold">Cloud & DevOps:</span> Google Cloud
              Platform (GCP), Docker, Firebase
            </li>
            <li>
              <span className="font-semibold">AI & Automation:</span> AI Stack
              integration, n8n workflows
            </li>
            <li>
              <span className="font-semibold">Modern Web:</span> Next.js, React,
              and a growing passion for Astro.js
            </li>
          </ul>
        </section>

        {/* Section 3: Creator & Traveler */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            The Creator & Traveler
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
            Beyond code, I am a Creator and Producer. I handle "everything that
            comes with video, photography, and web development," merging
            aesthetics with function.
          </p>
          <p className="text-base sm:text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
            I also bring a global perspective to my work, having traveled to{" "}
            <strong>76 countries</strong>. This experience has shaped my
            adaptability and curiosity, driving me to consistently seek new
            challenges—both professionally and personally.
          </p>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-base sm:text-lg">
              Check out my photography work on{" "}
              <a
                href="https://unsplash.com/@uspekhi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:underline font-semibold"
              >
                Unsplash
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
              .
            </p>
          </div>
        </section>

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