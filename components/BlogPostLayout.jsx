jsx
import BaseHead from '../components/BaseHead';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FormattedDate from '../components/FormattedDate';
import Image from 'next/image'; // Using Next.js Image component

const BlogPostLayout = ({ title, description, pubDate, updatedDate, heroImage, children }) => {
  return (
    <>
      <BaseHead title={title} description={description} />

      {/* Google tag (gtag.js) - Needs to be handled differently in Next.js */}
      {/*
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-LC0B38KS98"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-LC0B38KS98');
      </script>
      */}

      <body>
        <Header />
        <main>
          <article>
            <div className="hero-image">
              {heroImage && (
                <Image
                  src={heroImage}
                  alt=""
                  width={1020}
                  height={510}
                  layout="responsive" // or other appropriate layout
                />
              )}
            </div>
            <div className="prose">
              <div className="title">
                <div className="date">
                  <FormattedDate date={pubDate} />
                  {updatedDate && (
                    <div className="last-updated-on">
                      Last updated on <FormattedDate date={updatedDate} />
                    </div>
                  )}
                </div>
                <h1>{title}</h1>
                <hr />
              </div>
              {children}
            </div>
          </article>
        </main>
        <Footer />

        <style jsx>{`
          main {
            width: calc(100% - 2em);
            max-width: 100%;
            margin: 0;
          }
          .hero-image {
            width: 100%;
          }
          .hero-image img {
            display: block;
            margin: 0 auto;
            border-radius: 12px;
            box-shadow: var(--box-shadow);
          }
          .prose {
            width: 720px;
            max-width: calc(100% - 2em);
            margin: auto;
            padding: 1em;
            color: rgb(var(--gray-dark));
          }
          .title {
            margin-bottom: 1em;
            padding: 1em 0;
            text-align: center;
            line-height: 1;
          }
          .title h1 {
            margin: 0 0 0.5em 0;
          }
          .date {
            margin-bottom: 0.5em;
            color: rgb(var(--gray));
          }
          .last-updated-on {
            font-style: italic;
          }
        `}</style>
      </body>
    </>
  );
};

export default BlogPostLayout;