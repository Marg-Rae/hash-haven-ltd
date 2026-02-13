import { motion } from 'framer-motion';
import { 
  FaLeaf, FaCode, FaHome, FaGlobe, FaHeart, 
  FaLightbulb, FaSeedling, FaHandshake 
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const values = [
    {
      icon: FaSeedling,
      title: 'Regenerative Thinking',
      description: 'Building systems that restore, enhance, and create lasting value for land and communities.'
    },
    {
      icon: FaLightbulb,
      title: 'Innovation with Purpose',
      description: 'Leveraging technology to solve real problems and strengthen connections between people and place.'
    },
    {
      icon: FaHeart,
      title: 'Long-term Vision',
      description: 'Thinking in generations, not quarters. Making decisions that honor both present needs and future potential.'
    },
    {
      icon: FaHandshake,
      title: 'Aligned Collaboration',
      description: 'Building meaningful partnerships with those who share our values and commitment to positive impact.'
    }
  ];

  const pillars = [
    {
      icon: FaLeaf,
      title: 'Land Stewardship',
      description: 'We study and implement regenerative land management practices, from soil biology to water systems, GIS mapping to geological research. Our approach integrates traditional wisdom with modern scientific understanding.',
      gradient: 'from-sage-500 to-sage-700'
    },
    {
      icon: FaCode,
      title: 'Digital Innovation',
      description: 'We build web applications, data tools, and digital platforms that serve people and strengthen systems. Technology should be human-centered, purposeful, and accessible.',
      gradient: 'from-sky-500 to-sky-700'
    },
    {
      icon: FaHome,
      title: 'Homestead Systems',
      description: 'We explore modern homesteading as a practice of self-reliance, resilience, and connection to land. This includes food production, energy systems, and sustainable living infrastructure.',
      gradient: 'from-terracotta-500 to-terracotta-700'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-earth-100 to-sage-100">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-earth-900">
              About <span className="gradient-text">HashHaven Ltd</span>
            </h1>
            <p className="text-xl text-earth-700 leading-relaxed">
              We're building integrated systems for land, life, and digital resilience. 
              A convergence of regenerative agriculture, modern homesteading, GIS mapping, 
              digital innovation, and Mandarin language learning—rooted in curiosity and 
              commitment to long-term thinking.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-4xl mx-auto"
          >
            <div className="card p-12 bg-gradient-to-br from-white to-earth-50">
              <div className="flex items-center justify-center mb-6">
                <FaGlobe className="text-5xl text-terracotta-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-earth-900 text-center">
                Our Mission
              </h2>
              <p className="text-lg text-earth-700 leading-relaxed text-center mb-6">
                To create systems—both digital and physical—that strengthen resilience, 
                foster regeneration, and honor the interconnection between land, technology, 
                and human flourishing.
              </p>
              <p className="text-lg text-earth-700 leading-relaxed text-center">
                We believe the future belongs to those who can bridge traditional knowledge 
                with modern innovation, who think systemically, and who are willing to invest 
                in meaningful, long-term work.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="section-padding bg-white/50">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-serif font-bold mb-4 text-earth-900">
              What We Do
            </h2>
            <p className="text-lg text-earth-600 max-w-2xl mx-auto">
              Three interconnected domains of exploration and practice.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.2 }}
                className="card p-8"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center mb-6`}>
                  <pillar.icon className="text-3xl text-white" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 text-earth-900">
                  {pillar.title}
                </h3>
                <p className="text-earth-600 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-serif font-bold mb-4 text-earth-900">
              Our Values
            </h2>
            <p className="text-lg text-earth-600 max-w-2xl mx-auto">
              Principles that guide our work and relationships.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="card p-8"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-terracotta-500 to-terracotta-700 flex items-center justify-center flex-shrink-0">
                    <value.icon className="text-2xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold mb-2 text-earth-900">
                      {value.title}
                    </h3>
                    <p className="text-earth-600">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Interests */}
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
              Beyond the Core
            </h2>
            <div className="card p-8">
              <p className="text-lg text-earth-700 leading-relaxed mb-4">
                Our work also extends into areas like <strong className="text-terracotta-700">Mandarin language learning</strong>, 
                exploring cross-cultural communication and global perspectives, and <strong className="text-sage-700">geological 
                studies</strong>, understanding the deep time and physical forces that shape landscapes.
              </p>
              <p className="text-lg text-earth-700 leading-relaxed">
                These seemingly disparate threads connect through a common commitment: 
                understanding complex systems, thinking long-term, and building capacity 
                for meaningful engagement with the world.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="section-padding bg-gradient-to-br from-sage-700 via-earth-700 to-terracotta-700 text-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center"
          >
            <FaHandshake className="text-5xl mx-auto mb-6" />
            <h2 className="text-4xl font-serif font-bold mb-6">
              Open to Aligned Collaborations
            </h2>
            <p className="text-xl text-earth-50 leading-relaxed mb-8">
              We're interested in working with individuals and organizations who share our 
              values and vision. Whether it's land projects, digital innovation, research 
              collaboration, or strategic partnerships—we believe in building relationships 
              that create lasting positive impact.
            </p>
            <p className="text-lg text-earth-100 mb-8">
              If you're thinking long-term, working on meaningful problems, and value 
              integrity and depth over speed and surface—let's talk.
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-4 bg-white text-earth-900 font-semibold rounded-xl hover:scale-105 transition-transform duration-300 shadow-xl"
            >
              Start a Conversation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
