import { ExternalLink } from "lucide-react";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold font-headline mb-4">About Me</h1>
      <p className="text-lg">Helmar Baechle</p>

      <div className="mx-auto max-w-screen-md text-left space-y-6">
        <p className="text-base sm:text-lg leading-relaxed">
         As a Level 3 Support Associate at Amazon, I expertly manage complex and escalated issues for premium sellers. 
         Outside of work, I'm an avid technologist, particularly interested in Astro.js for app development, 
         and a seasoned traveler with experience in 72 countries, bringing a global perspective to my work. 
         I consistently seek new challenges and opportunities for growth, both professionally and personally.
        </p>

        <p className="text-base sm:text-lg leading-relaxed">
          I am also Creator, Producer, Developer and everything that comes with video, photography and Web Development.
          Here are some photos which can be downloaded on Unsplash
        </p>

        
           <a
  href="https://unsplash.com/@uspekhi"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-1 text-blue-600 underline hover:text-blue-800"
>
  View on Unsplash
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 3h7v7m0 0L10 21l-7-7 11-11z" />
  </svg>
</a>
      </div>




    </div>
  );}
