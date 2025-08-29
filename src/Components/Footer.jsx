import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="pt-10 px-4 md:px-20 lg:px-32 bg-gray-900 w-full text-center">
      {/* Logo & About */}
      <div className="mb-8">
        <img src={assets.logo1} alt="NutriCore Logo" className="mx-auto mb-5 w-32" />
        <p className="text-white text-sm sm:text-base mx-auto max-w-2xl">
          Understanding what you put into your body is the first step toward a healthier lifestyle. 
          By reading nutrition labels and making informed choices, you can enjoy balanced meals, 
          stay energized, and nurture your wellness. Small, mindful decisions today lead to big 
          improvements tomorrow.
        </p>
      </div>

      {/* Social Media Links */}
      <div className="mb-8 flex justify-center space-x-6">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-600">
          Facebook
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
          Twitter
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-500">
          Instagram
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-700">
          LinkedIn
        </a>
      </div>

      {/* Contact & Quick Links */}
      <div className="mb-8 flex flex-col md:flex-row justify-center gap-12">
        <div>
          <p className="text-xl font-medium mb-4 text-white">Get in Touch</p>
          <ul className="flex flex-col space-y-2 text-white">
            <li>+88017XX-XXXXXX</li>
            <li>nutriCore@gmail.com</li>
            <li>
              <Link to="/admin" className="hover:text-green-600">
                Admin Login
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-4 text-white">Quick Links</p>
          <ul className="flex flex-col space-y-2 text-white">
            <li>
              <Link to="/" className="hover:text-green-600">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-green-600">About</Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-green-600">Products</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-600">Contact</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-5">
        <p className="text-sm text-white">&copy; 2025 NutriCore. All Rights Reserved.</p>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition"
      >
        ↑
      </button>
    </footer>
  );
};

export default Footer;
