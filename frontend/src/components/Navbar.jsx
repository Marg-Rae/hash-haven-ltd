import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import logoIcon from '../assets/HashLogoIcon.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/land-lab', label: 'Land Lab' },
    { path: '/digital-forge', label: 'Digital Forge' },
    { path: '/field-notes', label: 'Field Notes' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/98 backdrop-blur-xl shadow-2xl border-b-2 border-logo-green-300'
          : 'bg-logo-brown-900/85 backdrop-blur-md shadow-lg'
      }`}
    >
      <div className="container-custom section-padding py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={logoIcon}
              alt="HaSh Haven Ltd"
              className="h-10 w-10"
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`text-xl font-serif font-bold hidden sm:block ${
                scrolled ? 'gradient-text' : 'text-earth-50'
              }`}
            >
              HaSh Haven Ltd
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-semibold transition-all duration-300 ${
                  location.pathname === link.path
                    ? scrolled 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-logo-green-700 to-logo-brown-700'
                      : 'text-earth-100 border-b-2 border-earth-100'
                    : scrolled 
                      ? 'text-logo-brown-900 hover:text-logo-green-700 hover:scale-105'
                      : 'text-earth-200 hover:text-earth-50 hover:scale-105'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden transition-colors ${
              scrolled ? 'text-logo-brown-900 hover:text-logo-green-700' : 'text-earth-50 hover:text-earth-100'
            }`}
          >
            {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden mt-4 space-y-3 py-4 px-2 rounded-xl ${
              scrolled ? 'bg-earth-50' : 'bg-logo-brown-800/50 backdrop-blur-md'
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 font-semibold transition-colors duration-300 ${
                  location.pathname === link.path
                    ? scrolled
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-logo-green-700 to-logo-brown-700'
                      : 'text-earth-100'
                    : scrolled
                      ? 'text-logo-brown-900 hover:text-logo-green-700'
                      : 'text-earth-200 hover:text-earth-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
