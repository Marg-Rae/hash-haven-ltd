import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
} from 'react-icons/fa6';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { label: 'Land Lab', path: '/land-lab' },
      { label: 'Digital Forge', path: '/digital-forge' },
      { label: 'Field Notes', path: '/field-notes' },
    ],
    company: [
      { label: 'About', path: '/about' },
      { label: 'Contact', path: '/contact' },
    ],
  };

  const socialLinks = [
    {
      icon: FaGithub,
      url: 'https://github.com/Marg-Rae',
      label: 'GitHub',
      hoverClass: 'hover:text-white',
    },
    {
      icon: FaWhatsapp,
      url: 'https://wa.me/qr/MOAEG7L2JKPPP1',
      label: 'WhatsApp',
      hoverClass: 'hover:text-[#25D366]',
    },
    {
      icon: FaInstagram,
      url: 'https://www.instagram.com/chepkoech_9?igsh=NnAyeTBrejRkM2lm',
      label: 'Instagram',
      hoverClass: 'hover:text-[#E4405F]',
    },
    {
      icon: FaFacebook,
      url: 'https://www.facebook.com/share/17DaR1LLWm/',
      label: 'Facebook',
      hoverClass: 'hover:text-[#1877F2]',
    },
    {
      icon: FaTiktok,
      url: 'http://tiktok.com/@chepkoech_9',
      label: 'TikTok',
      hoverClass: 'hover:text-[#EE1D52]',
    },
    {
      icon: FaXTwitter,
      url: 'https://x.com/hash_haven009',
      label: 'X',
      hoverClass: 'hover:text-white',
    },
    {
      icon: FaPinterest,
      url: 'https://pin.it/34OnHZZn9',
      label: 'Pinterest',
      hoverClass: 'hover:text-[#E60023]',
    },
    {
      icon: FaLinkedin,
      url: 'http://www.linkedin.com/in/chepkoech-ketter-083b79354',
      label: 'LinkedIn',
      hoverClass: 'hover:text-[#0A66C2]',
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-earth-800 via-earth-900 to-sage-900 text-earth-50">
      <div className="container-custom section-padding">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif font-bold mb-4 text-white">
              HashHaven Ltd
            </h3>
            <p className="text-earth-200 mb-4 max-w-md">
              Building Systems for Land, Life & Digital Resilience. 
              Regenerative land systems, modern homesteading, and digital innovation.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target={social.url.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className={`text-earth-300 transition-all duration-300 hover:-translate-y-1 ${social.hoverClass}`}
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Explore</h4>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-earth-300 hover:text-terracotta-400 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-earth-300 hover:text-terracotta-400 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-earth-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-earth-300 text-sm">
              © {currentYear} HashHaven Ltd. All rights reserved.
            </p>
            <p className="text-earth-400 text-sm">
              Built with passion for sustainable systems
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
