import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FaCode, FaGithub, FaExternalLinkAlt, FaReact, 
  FaNodeJs, FaDatabase, FaChartBar, FaLaptopCode 
} from 'react-icons/fa';
import { projectsAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import eurobridgeLogo from '../assets/eurobridge-logo.jpg';

const DigitalForge = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getAll({ category: 'Digital Forge' });
        setProjects(response.data.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const skills = [
    { icon: FaReact, name: 'React', color: 'from-sky-400 to-sky-600' },
    { icon: FaNodeJs, name: 'Node.js', color: 'from-green-400 to-green-600' },
    { icon: FaDatabase, name: 'MongoDB', color: 'from-emerald-400 to-emerald-600' },
    { icon: FaChartBar, name: 'Data Viz', color: 'from-purple-400 to-purple-600' },
  ];

  const categories = ['all', 'Web Apps', 'Data Tools', 'APIs', 'GIS'];

  const portfolioSpotlight = [
    {
      _id: 'eurobridge-language-institute',
      title: 'Eurobridge Language Institute',
      status: 'Ongoing',
      featured: true,
      description:
        'A bilingual-ready language institute website serving online learners and in-person students in Eldoret, Kenya. Designed to guide inquiries to enrollment while highlighting certification pathways and job outcomes.',
      technologies: ['Web Apps', 'APIs'],
      liveUrl: 'https://eurobridgelanguageinstitute.com',
      logo: eurobridgeLogo,
      services: [
        'Brand-focused web presence and admissions flow',
        'Program catalog structure for multiple languages',
        'Inquiry-to-enrollment prompts and contact pathways',
      ],
      outcomes: [
        'Showcases certificate credibility and career readiness',
        'Supports local and international student outreach',
        'Improves clarity for course selection and enrollment',
      ],
    },
  ];

  const allProjects = [...portfolioSpotlight, ...projects];

  const filteredProjects = filter === 'all' 
    ? allProjects 
    : allProjects.filter(p => p.technologies?.includes(filter));

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-sky-100 to-earth-100">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center">
                <FaCode className="text-3xl text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-earth-900">
              Digital Forge
            </h1>
            <p className="text-xl text-earth-700 leading-relaxed">
              Crafting modern web applications and digital tools that solve real-world problems. 
              From data visualization to full-stack platforms, we build technology that serves 
              people and strengthens systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
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
              Tech Stack
            </h2>
            <p className="text-lg text-earth-600 max-w-2xl mx-auto">
              Modern technologies and frameworks for building robust applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center mx-auto mb-4`}>
                  <skill.icon className="text-3xl text-white" />
                </div>
                <h3 className="text-lg font-semibold text-earth-900">
                  {skill.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
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
              Portfolio
            </h2>
            <p className="text-lg text-earth-600 max-w-2xl mx-auto mb-8">
              A selection of projects demonstrating technical skills and creative problem-solving.
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    filter === category
                      ? 'bg-sky-600 text-white shadow-lg'
                      : 'bg-white text-earth-700 hover:bg-earth-50 border border-earth-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          {loading && projects.length === 0 && portfolioSpotlight.length === 0 ? (
            <LoadingSpinner message="Loading projects..." />
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ delay: index * 0.1 }}
                  className="card p-6 flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {project.logo && (
                        <img
                          src={project.logo}
                          alt={`${project.title} logo`}
                          className="h-10 w-10 rounded-lg object-contain bg-white p-1 shadow-sm"
                          loading="lazy"
                        />
                      )}
                      <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-semibold">
                        {project.status}
                      </span>
                    </div>
                    {project.featured && (
                      <span className="px-3 py-1 bg-terracotta-100 text-terracotta-700 rounded-full text-sm font-semibold">
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-serif font-bold mb-3 text-earth-900">
                    {project.title}
                  </h3>
                  
                  <p className="text-earth-600 mb-4 flex-grow">
                    {project.description}
                  </p>

                  {project.services && project.services.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-earth-800 mb-2">Services</p>
                      <ul className="space-y-2 text-sm text-earth-600">
                        {project.services.map((service, i) => (
                          <li key={`${project._id}-service-${i}`} className="flex items-start">
                            <span className="mt-2 mr-2 h-1.5 w-1.5 rounded-full bg-sky-500"></span>
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.outcomes && project.outcomes.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-earth-800 mb-2">Outcomes</p>
                      <ul className="space-y-2 text-sm text-earth-600">
                        {project.outcomes.map((outcome, i) => (
                          <li key={`${project._id}-outcome-${i}`} className="flex items-start">
                            <span className="mt-2 mr-2 h-1.5 w-1.5 rounded-full bg-terracotta-500"></span>
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-earth-100 text-earth-700 rounded-lg text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3 mt-auto">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-earth-800 text-white rounded-lg hover:bg-earth-900 transition-colors"
                      >
                        <FaGithub /> Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                      >
                        <FaExternalLinkAlt /> Live
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="card p-12 text-center">
              <FaLaptopCode className="text-5xl text-sky-400 mx-auto mb-4" />
              <p className="text-earth-600 text-lg">
                {filter === 'all' 
                  ? 'Projects are currently being documented. Check back soon!'
                  : `No projects found in category: ${filter}`
                }
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Capabilities */}
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
              Development Capabilities
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Full-Stack Development',
                description: 'End-to-end application development using modern frameworks and best practices.',
                features: ['React & Vue.js', 'Node.js & Express', 'MongoDB & PostgreSQL', 'RESTful APIs']
              },
              {
                title: 'Data Visualization',
                description: 'Transform complex data into intuitive, interactive visualizations.',
                features: ['D3.js & Chart.js', 'Leaflet & Mapbox', 'Real-time dashboards', 'Custom graphics']
              },
              {
                title: 'GIS Integration',
                description: 'Geographic information systems for spatial analysis and mapping.',
                features: ['Interactive maps', 'Spatial analysis', 'Data layers', 'Custom tools']
              },
              {
                title: 'API Development',
                description: 'Robust backend services and data integration solutions.',
                features: ['REST & GraphQL', 'Authentication', 'Data processing', 'Third-party integration']
              }
            ].map((capability, index) => (
              <motion.div
                key={capability.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="card p-8"
              >
                <h3 className="text-2xl font-serif font-bold mb-3 text-earth-900">
                  {capability.title}
                </h3>
                <p className="text-earth-600 mb-4">
                  {capability.description}
                </p>
                <ul className="space-y-2">
                  {capability.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-earth-700">
                      <span className="w-2 h-2 bg-sky-600 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-sky-700 to-earth-800 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <FaCode className="text-5xl mx-auto mb-6" />
            <h2 className="text-4xl font-serif font-bold mb-6">
              Have a Project in Mind?
            </h2>
            <p className="text-xl text-earth-50 max-w-2xl mx-auto mb-8">
              Let's build something meaningful together. From concept to deployment, 
              we bring technical expertise and creative problem-solving to every project.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-earth-900 font-semibold rounded-xl hover:scale-105 transition-transform duration-300 shadow-xl"
            >
              Start a Conversation
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DigitalForge;
