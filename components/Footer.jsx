jsx
import Social from './Social'; // Assuming Social.jsx is created or will be created

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-9 lg:py-12 text-center bg-slate-300">
      <div className="footer-nav">
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/portfolio">Portfolio</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </div>
      {/* Assuming Social.jsx is created or will be created */}
      <Social />
      <div className="text-sm y-5" data-test="footer-text">&copy;{currentYear} Uspekhi</div>

      <style jsx>{`
        .footer-nav {
          text-align: center;
        }

        .footer-nav nav ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
          display: inline-block;
        }

        .footer-nav nav ul li {
          display: inline-block;
          margin: 0 10px;
        }
      `}</style>
    </footer>
  );
};

export default Footer;