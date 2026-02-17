import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaLeaf, FaCode, FaHome, FaBook, FaMapMarkedAlt, 
  FaFlask, FaArrowRight, FaSeedling 
} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { postsAPI } from '../services/api';
import heroVideoUrl from '../assets/herovideo.mp4';
import landlabImage from '../assets/landlab.jpg';
import digitalforgeImage from '../assets/digitalforge.jpg';
import homesteadImage from '../assets/homesteadsystems.jpg';
import homesteadAltImage from '../assets/homestead-alt.jpg';

const Home = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        const response = await postsAPI.getAll({ featured: true, limit: 3 });
        setFeaturedPosts(response.data.data);
      } catch (error) {
        console.error('Error fetching featured posts:', error);
      }
    };
    fetchFeaturedPosts();
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const features = [
    {
      icon: FaLeaf,
      title: 'Land Lab',
      description: 'Regenerative agriculture, geology, and GIS mapping for sustainable land management.',
      link: '/land-lab',
      gradient: 'from-logo-green-600 via-sage-600 to-logo-green-700'
    },
    {
      icon: FaCode,
      title: 'Digital Forge',
      description: 'Web applications, tech projects, and digital innovation for modern solutions.',
      link: '/digital-forge',
      gradient: 'from-earth-600 via-earth-700 to-logo-brown-700'
    },
    {
      icon: FaHome,
      title: 'Homestead Systems',
      description: 'Modern homesteading practices integrating technology and traditional wisdom.',
      link: '/about',
      gradient: 'from-terracotta-600 via-earth-600 to-earth-700'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section with Video Background */}
      <section className="section-padding min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideoUrl} type="video/mp4" />
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="container-custom text-center relative z-10"
        >
          <motion.h1
            variants={fadeIn}
            className="text-5xl md:text-7xl font-serif font-bold mb-6 text-white drop-shadow-2xl"
          >
            Building Systems for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-logo-green-200 via-sage-200 to-earth-200 drop-shadow-lg">
              Land, Life & Digital Resilience
            </span>
          </motion.h1>
          
          <motion.p
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
          >
            Integrating regenerative land systems, modern homesteading, 
            and digital innovation for a sustainable future.
          </motion.p>
          
          <motion.div
            variants={fadeIn}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/about" className="btn-primary">
              Explore the Journey
              <FaArrowRight className="inline ml-2" />
            </Link>
            <Link to="/contact" className="btn-outline">
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* What We're Building Section */}
      <section className="section-padding bg-gradient-to-br from-white/60 via-logo-green-50/30 to-earth-50/30 backdrop-blur-sm">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-logo-green-900 via-logo-brown-800 to-earth-800">
              What We're Building
            </h2>
            <p className="text-lg text-logo-brown-800 max-w-2xl mx-auto font-medium">
              A convergence of land stewardship, digital innovation, and sustainable living systems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.2 }}
              >
                <Link to={feature.link} className="block">
                  <div className="card p-8 h-full hover:shadow-2xl transition-all duration-300 group">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="text-3xl text-white" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-4 text-earth-900">
                      {feature.title}
                    </h3>
                    <p className="text-earth-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Land Lab Preview */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-logo-green-600 via-sage-600 to-logo-green-700 flex items-center justify-center mr-4 shadow-lg">
                  <FaMapMarkedAlt className="text-2xl text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-logo-green-800 to-sage-700">
                  Land Lab
                </h2>
              </div>
              <p className="text-lg text-earth-700 mb-6 leading-relaxed">
                Exploring regenerative agriculture, geological research, and GIS mapping 
                to create resilient land management systems. We combine traditional 
                knowledge with modern technology for sustainable practices.
              </p>
              <ul className="space-y-3 mb-8">
                {['Soil & Water Research', 'GIS Mapping & Analysis', 'Regenerative Agriculture', 'Geological Studies'].map((item) => (
                  <li key={item} className="flex items-center text-earth-700 font-medium">
                    <FaSeedling className="text-logo-green-700 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/land-lab" className="btn-secondary">
                Explore Land Lab
                <FaArrowRight className="inline ml-2" />
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
              className="card p-8 bg-gradient-to-br from-logo-green-50 via-sage-50 to-earth-50 shadow-xl border-2 border-logo-green-100"
            >
              <div className="aspect-video bg-gradient-to-br from-logo-green-100 via-sage-100 to-earth-100 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={landlabImage} 
                  alt="Land Lab - Regenerative Agriculture" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Digital Forge Preview */}
      <section className="section-padding bg-gradient-to-br from-earth-50/40 via-earth-100/40 to-logo-brown-50/40">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="order-2 lg:order-1"
            >
              <div className="card p-8 bg-gradient-to-br from-earth-50 via-earth-100 to-logo-brown-50 shadow-xl border-2 border-earth-200">
                <div className="aspect-video bg-gradient-to-br from-earth-200 via-earth-300 to-logo-brown-200 rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src={homesteadImage} 
                    alt="Digital Forge - Web Applications" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-earth-600 via-earth-700 to-logo-brown-700 flex items-center justify-center mr-4 shadow-lg">
                  <FaCode className="text-2xl text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-earth-800 via-logo-brown-800 to-logo-brown-900">
                  Digital Forge
                </h2>
              </div>
              <p className="text-lg text-earth-700 mb-6 leading-relaxed">
                Building modern web applications and digital tools that solve real-world 
                problems. From data visualization to interactive platforms, we create 
                technology that serves people and land.
              </p>
              <ul className="space-y-3 mb-8">
                {['Full-Stack Web Development', 'Data Visualization', 'API Development', 'Digital Innovation'].map((item) => (
                  <li key={item} className="flex items-center text-earth-700 font-medium">
                    <FaFlask className="text-earth-700 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/digital-forge" className="btn-primary">
                View Projects
                <FaArrowRight className="inline ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Homestead Systems Preview */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-terracotta-600 via-earth-600 to-earth-700 flex items-center justify-center mr-4 shadow-lg">
                  <FaHome className="text-2xl text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-terracotta-800 via-earth-800 to-earth-900">
                  Homestead Systems
                </h2>
              </div>
              <p className="text-lg text-earth-700 mb-6 leading-relaxed">
                Integrating technology with traditional homesteading wisdom. We design 
                systems that combine modern innovation with sustainable living practices 
                for true self-sufficiency and resilience.
              </p>
              <ul className="space-y-3 mb-8">
                {['Sustainable Food Systems', 'Water & Energy Management', 'Off-Grid Solutions', 'Community Resilience'].map((item) => (
                  <li key={item} className="flex items-center text-earth-700 font-medium">
                    <FaHome className="text-terracotta-700 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/about" className="btn-secondary">
                Learn About Homesteading
                <FaArrowRight className="inline ml-2" />
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
              className="card p-8 bg-gradient-to-br from-terracotta-50 via-earth-50 to-earth-100 shadow-xl border-2 border-terracotta-100"
            >
              <div className="aspect-video bg-gradient-to-br from-terracotta-200 via-earth-200 to-earth-300 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={homesteadAltImage} 
                  alt="Homestead Systems - Sustainable Living" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Field Notes Preview */}
      {featuredPosts.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-logo-green-800 via-sage-700 to-earth-700">
                Field Notes
              </h2>
              <p className="text-lg text-earth-600 max-w-2xl mx-auto">
                Insights, discoveries, and reflections from our journey.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/field-notes/${post.slug}`} className="block">
                    <div className="card p-6 h-full hover:shadow-2xl transition-all duration-300">
                      <div className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-logo-green-700 to-sage-700 font-bold mb-2">
                        {post.category}
                      </div>
                      <h3 className="text-xl font-serif font-bold mb-3 text-earth-900 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-earth-600 line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="text-sm text-earth-500">
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link to="/field-notes" className="btn-outline">
                Read All Posts
                <FaBook className="inline ml-2" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-br from-logo-green-800 via-logo-brown-800 to-earth-800 text-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-logo-green-700/20 via-transparent to-logo-brown-700/20 pointer-events-none"></div>
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Open to Aligned Collaborations
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-earth-50">
              We believe in long-term strategic thinking and meaningful partnerships 
              that create lasting positive impact.
            </p>
            <Link to="/contact" className="inline-block px-8 py-4 bg-white text-earth-900 font-semibold rounded-xl hover:scale-105 transition-transform duration-300 shadow-xl">
              Start a Conversation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
