import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaSearch, FaCalendar, FaTag } from 'react-icons/fa';
import { postsAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import VideoHero from '../components/VideoHero';

const FieldNotes = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postsAPI.getAll();
        setPosts(response.data.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const categories = ['all', 'Land Lab', 'Digital Forge', 'Homestead', 'Research', 'Journey'];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = filter === 'all' || post.category === filter;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-20">
      {/* Hero Section with Video */}
      <VideoHero
        videoSrc="/videos/FieldNotes.mp4"
        icon={FaBook}
        title="Field Notes"
        subtitle="Insights, discoveries, and reflections from our journey building systems for land, life, and digital resilience."
        iconGradient="from-terracotta-500 to-terracotta-700"
      />

      {/* Search and Filter */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-12"
          >
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-earth-400" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-earth-200 focus:outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-200 transition-all duration-300"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    filter === category
                      ? 'bg-terracotta-600 text-white shadow-lg'
                      : 'bg-white text-earth-700 hover:bg-earth-50 border border-earth-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Posts Grid */}
          {loading ? (
            <LoadingSpinner message="Loading posts..." />
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/field-notes/${post.slug}`} className="block h-full">
                    <div className="card p-6 h-full flex flex-col hover:shadow-2xl transition-all duration-300 group">
                      {/* Category Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-terracotta-100 text-terracotta-700 rounded-full text-sm font-semibold flex items-center gap-1">
                          <FaTag className="text-xs" />
                          {post.category}
                        </span>
                        {post.featured && (
                          <span className="px-3 py-1 bg-sage-100 text-sage-700 rounded-full text-sm font-semibold">
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-serif font-bold mb-3 text-earth-900 group-hover:text-terracotta-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-earth-600 mb-4 flex-grow line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm text-earth-500 pt-4 border-t border-earth-100">
                        <div className="flex items-center gap-2">
                          <FaCalendar className="text-xs" />
                          {new Date(post.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="text-earth-400">
                          {post.views || 0} views
                        </div>
                      </div>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {post.tags.slice(0, 3).map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-earth-100 text-earth-600 rounded text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="card p-12 text-center">
              <FaBook className="text-5xl text-terracotta-400 mx-auto mb-4" />
              <p className="text-earth-600 text-lg">
                {searchTerm || filter !== 'all'
                  ? 'No posts found matching your criteria.'
                  : 'No posts available yet. Check back soon!'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-earth-700 to-terracotta-800 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-serif font-bold mb-6">
              Stay Connected
            </h2>
            <p className="text-xl text-earth-50 max-w-2xl mx-auto mb-8">
              Follow our journey as we document insights, learnings, and discoveries 
              in regenerative systems and digital innovation.
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-4 bg-white text-earth-900 font-semibold rounded-xl hover:scale-105 transition-transform duration-300 shadow-xl"
            >
              Subscribe for Updates
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FieldNotes;
