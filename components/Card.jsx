jsx
import Link from 'next/link'; // Import Link for client-side navigation

const Card = ({ post }) => {
  return (
    <Link href={post.url} legacyBehavior>
      <a className="transition-all duration-75 ease-in-out h-full block relative top-0 hover:-top-2 shadow-lg hover:hover:shadow-xl bg-white rounded-xl overflow-hidden" data-test="article-card">
        {/* Assuming image path is correct relative to public directory */}
        <img className="squiggle" src={post.frontmatter.hero} alt={post.frontmatter.title} width={360} height={192} />
        <div className="py-6 px-8">
          <h2 className="font-bold text-2xl leading-tight">
            {post.frontmatter.title}
          </h2>
          <p className="text-xs text-gray-600 mt-4 flex items-center">
            {/* Add date or other info here if needed */}
          </p>
        </div>
        <style jsx>{`
          img {
            width: 100%;
            aspect-ratio: 15/9;
            object-fit: cover;
          }
        `}</style>
      </a>
    </Link>
  );
};

export default Card;