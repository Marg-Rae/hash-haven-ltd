import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEnvelope, FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { contactAPI } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'General Inquiry'
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const inquiryTypes = [
    'General Inquiry',
    'Partnership',
    'Collaboration',
    'Technical',
    'Other'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await contactAPI.submit(formData);
      setStatus({
        type: 'success',
        message: response.data.message || 'Thank you for reaching out! We will get back to you soon.'
      });
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'General Inquiry'
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-terracotta-100 via-earth-100 to-earth-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-logo-green-200/10 via-transparent to-logo-brown-200/10 pointer-events-none"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-terracotta-600 via-earth-600 to-earth-700 flex items-center justify-center shadow-xl">
                <FaEnvelope className="text-3xl text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-terracotta-800 via-earth-800 to-logo-brown-800">
              Get in Touch
            </h1>
            <p className="text-xl text-earth-700 leading-relaxed">
              Whether you're interested in collaboration, have a project in mind, 
              or simply want to connect—we'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="card p-8 md:p-12">
              {/* Status Message */}
              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
                    status.type === 'success'
                      ? 'bg-sage-100 text-sage-800'
                      : 'bg-terracotta-100 text-terracotta-800'
                  }`}
                >
                  {status.type === 'success' ? (
                    <FaCheckCircle className="text-xl flex-shrink-0 mt-1" />
                  ) : (
                    <FaExclamationCircle className="text-xl flex-shrink-0 mt-1" />
                  )}
                  <p>{status.message}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-earth-900 font-semibold mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-earth-900 font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Inquiry Type */}
                <div>
                  <label htmlFor="type" className="block text-earth-900 font-semibold mb-2">
                    Inquiry Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="input-field"
                  >
                    {inquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-earth-900 font-semibold mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="What's this about?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-earth-900 font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="textarea-field"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full btn-primary flex items-center justify-center gap-2 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner w-5 h-5 border-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Contact Info */}
      <section className="section-padding bg-white/50">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-serif font-bold mb-6 text-earth-900 text-center">
              What to Expect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sage-500 to-sage-700 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold text-earth-900 mb-2">
                  Quick Response
                </h3>
                <p className="text-earth-600">
                  We typically respond within 24-48 hours.
                </p>
              </div>
              
              <div className="card p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold text-earth-900 mb-2">
                  Thoughtful Dialogue
                </h3>
                <p className="text-earth-600">
                  We take time to understand your needs and vision.
                </p>
              </div>
              
              <div className="card p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-terracotta-500 to-terracotta-700 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold text-earth-900 mb-2">
                  Strategic Alignment
                </h3>
                <p className="text-earth-600">
                  We explore how we might work together meaningfully.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-earth-700 to-sage-800 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Building Together
            </h2>
            <p className="text-xl text-earth-50 max-w-2xl mx-auto">
              The best work emerges from meaningful collaboration. 
              We're here to listen, learn, and explore possibilities together.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
