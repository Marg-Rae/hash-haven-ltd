import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendar, FaUser, FaEye, FaTag, FaArrowLeft, FaBook } from 'react-icons/fa';
import { postsAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await postsAPI.getBySlug(slug);
        setPost(response.data.data);

        // Fetch related posts from same category
        if (response.data.data.category) {
          const relatedResponse = await postsAPI.getAll({ 
            category: response.data.data.category, 
            limit: 3 
          });
          const related = relatedResponse.data.data.filter(p => p.slug !== slug);
          setRelatedPosts(related.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Post not found');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen">
        <LoadingSpinner message="Loading post..." />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="pt-20 min-h-screen section-padding">
        <div className="container-custom text-center">
          <FaBook className="text-6xl text-earth-400 mx-auto mb-6" />
          <h2 className="text-3xl font-serif font-bold mb-4 text-earth-900">
            Post Not Found
          </h2>
          <p className="text-lg text-earth-600 mb-8">
            The post you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/field-notes" className="btn-primary">
            <FaArrowLeft className="inline mr-2" />
            Back to Field Notes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Back Button */}
      <section className="section-padding pb-8">
        <div className="container-custom max-w-4xl">
          <Link 
            to="/field-notes" 
            className="inline-flex items-center text-earth-600 hover:text-terracotta-600 transition-colors duration-300"
          >
            <FaArrowLeft className="mr-2" />
            Back to Field Notes
          </Link>
        </div>
      </section>

      {/* Post Header */}
      <section className="section-padding pt-0">
        <div className="container-custom max-w-4xl">
          <motion.article
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            {/* Category Badge */}
            <div className="mb-4">
              <span className="px-4 py-2 bg-terracotta-100 text-terracotta-700 rounded-full text-sm font-semibold inline-flex items-center gap-2">
                <FaTag />
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-earth-900">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap gap-6 text-earth-600 mb-8 pb-8 border-b border-earth-200">
              <div className="flex items-center gap-2">
                <FaUser className="text-terracotta-600" />
                <span>{post.author || 'HashHaven Team'}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendar className="text-terracotta-600" />
                <span>
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaEye className="text-terracotta-600" />
                <span>{post.views || 0} views</span>
              </div>
            </div>

            {/* Cover Image */}
            {post.coverImage && (
              <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={post.coverImage} 
                  alt={post.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <div className="text-xl text-earth-700 leading-relaxed mb-8 italic">
                {post.excerpt}
              </div>
              
              <div 
                className="text-earth-800 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ 
                  __html: post.content.replace(/\n/g, '<br />') 
                }}
              />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-12">
                <h3 className="text-lg font-semibold text-earth-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-earth-100 text-earth-700 rounded-lg hover:bg-earth-200 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.article>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-white/50">
          <div className="container-custom">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-serif font-bold text-earth-900">
                Related Posts
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost._id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/field-notes/${relatedPost.slug}`} className="block">
                    <div className="card p-6 h-full hover:shadow-2xl transition-all duration-300">
                      <div className="text-sm text-terracotta-600 font-semibold mb-2">
                        {relatedPost.category}
                      </div>
                      <h3 className="text-lg font-serif font-bold mb-2 text-earth-900 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-earth-600 text-sm line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-earth-700 to-terracotta-800 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-serif font-bold mb-4">
              Enjoyed this post?
            </h2>
            <p className="text-lg text-earth-50 mb-6">
              Explore more insights from our journey.
            </p>
            <Link
              to="/field-notes"
              className="inline-block px-8 py-4 bg-white text-earth-900 font-semibold rounded-xl hover:scale-105 transition-transform duration-300 shadow-xl"
            >
              Read More Posts
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
