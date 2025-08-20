jsx
import BlogPostLayout from '../components/BlogPostLayout';
import FeaturedCard from '../components/FeaturedCard';
import Image from 'next/image';

const Portfolio = () => {
  // SVG icon strings from the original Astro file
  const codeIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;

  return (
    <BlogPostLayout
      title="My Portfolio"
      description="find a selection of my projects and skills"
      pubDate={new Date()}
    >
      <p>Welcome to my portfolio page! Here you can find a selection of my projects and skills.</p>

      <div className="mx-auto max-w-screen-md px-4 py-6 text-left">
        <p className="text-base sm:text-lg leading-relaxed text-gray-700">
          As a Level 3 Support Associate for Amazon, I excel at handling complex queries and escalated issues...
        </p>

        <p className="mt-6 text-base sm:text-lg leading-relaxed">
          I am also Creator, Producer, Developer and everything that comes with video, photography and Web Development...
        </p>

        <div className="my-6">
          <a
            href="https://unsplash.com/@uspekhi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 underline hover:text-blue-800"
          >
            View on Unsplash
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 3h7v7m0 0L10 21l-7-7 11-11z" />
            </svg>
          </a>
        </div>


        <FeaturedCard
          icon={codeIcon}
          title={
            <a href="https://helmarbachle.web.app/" rel="noopener" target="_blank">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">My Resume</h5>
            </a>
          }
        >
          {/* Using Next.js Image component */}
          <Image src="/resume.png" alt="fallback check" width={500} height={300} />


          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Created with Svelte and deployed on Firebase
          </p>

          <a
            href="https://helmarbachle.web.app/"
            rel="noopener"
            target="_blank"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Visit Website
            <svg
              aria-hidden="true"
              className="w-4 h-4 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </FeaturedCard>


      </div>
    </BlogPostLayout>
  );
};

export default Portfolio;