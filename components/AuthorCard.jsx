jsx
import React from 'react';

const AuthorCard = ({ author }) => {
  return (
    <div className="px-8 py-8 mt-3 text-gray-500 rounded-2xl bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
      <div className="flex flex-wrap items-start gap-3 sm:flex-nowrap sm:gap-6">
        <div className="relative flex-shrink-0 w-24 h-24 mt-1">
          {
            author.image && (
              // Assuming image path is correct relative to public directory
              <img
                src={author.image}
                alt="Author Photo"
                width={96}
                height={96}
                loading="eager"
                className="rounded-full"
              />
            )
          }
        </div>
        <div>
          <div>
            <p className="text-lg font-medium text-gray-800 dark:text-gray-300">
              About {author.name}
            </p>
          </div>
          <div className="mt-3">
            {author.bio && <p>{author.bio}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;