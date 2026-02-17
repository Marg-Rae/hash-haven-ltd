import { motion } from 'framer-motion';
import { useState, useEffect, lazy, Suspense } from 'react';
import { 
  FaMapMarkedAlt, FaSeedling, FaTint, FaMountain, 
  FaChartLine, FaGlobe, FaLeaf 
} from 'react-icons/fa';
import { projectsAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import landLabHeroVideo from '../assets/LandLabHero.mp4';

const LandMap = lazy(() => import('../components/LandMap'));

const LandLab = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getAll({ category: 'Land Lab' });
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

  const researchAreas = [
    {
      icon: FaSeedling,
      title: 'Regenerative Agriculture',
      description: 'Building soil health and biodiversity through holistic land management practices.'
    },
    {
      icon: FaTint,
      title: 'Water Systems',
      description: 'Designing sustainable water catchment, storage, and distribution systems.'
    },
    {
      icon: FaMountain,
      title: 'Geology & Soil',
      description: 'Understanding geological formations and soil composition for optimal land use.'
    },
    {
      icon: FaMapMarkedAlt,
      title: 'GIS Mapping',
      description: 'Leveraging geographic information systems for data-driven land decisions.'
    },
    {
      icon: FaChartLine,
      title: 'Data Analysis',
      description: 'Monitoring and analyzing land metrics to track progress and results.'
    },
    {
      icon: FaGlobe,
      title: 'Ecosystem Design',
      description: 'Creating integrated systems that work with natural processes.'
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
          <source src={landLabHeroVideo} type="video/mp4" />
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div 
              variants={fadeIn}
              className="flex items-center justify-center mb-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-logo-green-600 to-logo-green-800 flex items-center justify-center shadow-2xl">
                <FaLeaf className="text-3xl text-white" />
              </div>
            </motion.div>
            <motion.h1 
              variants={fadeIn}
              className="text-5xl md:text-6xl font-serif font-bold mb-6 text-white drop-shadow-2xl"
            >
              Land Lab
            </motion.h1>
            <motion.p 
              variants={fadeIn}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/90 leading-relaxed drop-shadow-lg"
            >
              Exploring regenerative land systems through the integration of agriculture, 
              geology, GIS technology, and ecological design. Building resilient, 
              productive landscapes that restore and enhance natural systems.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Research Areas */}
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
              Research Areas
            </h2>
            <p className="text-lg text-earth-600 max-w-2xl mx-auto">
              Our multidisciplinary approach to understanding and stewarding land.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sage-500 to-sage-700 flex items-center justify-center mb-4">
                  <area.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-2 text-earth-900">
                  {area.title}
                </h3>
                <p className="text-earth-600">
                  {area.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GIS Mapping Section */}
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
              GIS Mapping & Analysis
            </h2>
            <p className="text-lg text-earth-600 max-w-2xl mx-auto">
              A land-intelligence map for visualizing field data, boundaries, and active projects.
            </p>
          </motion.div>

          <div className="card p-6 md:p-8">
            <Suspense
              fallback={
                <div className="min-h-[500px] flex items-center justify-center">
                  <LoadingSpinner message="Loading mapping layers..." />
                </div>
              }
            >
              <LandMap category="Land Lab" />
            </Suspense>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="rounded-2xl bg-earth-50 p-4 border border-earth-100">
                <p className="text-2xl font-bold text-sage-700">Topography</p>
                <p className="text-earth-600 text-sm">Elevation analysis</p>
              </div>
              <div className="rounded-2xl bg-earth-50 p-4 border border-earth-100">
                <p className="text-2xl font-bold text-sage-700">Hydrology</p>
                <p className="text-earth-600 text-sm">Water flow patterns</p>
              </div>
              <div className="rounded-2xl bg-earth-50 p-4 border border-earth-100">
                <p className="text-2xl font-bold text-sage-700">Land Use</p>
                <p className="text-earth-600 text-sm">Zone planning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
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
              Current Projects
            </h2>
            <p className="text-lg text-earth-600 max-w-2xl mx-auto">
              Active research and implementation projects in sustainable land management.
            </p>
          </motion.div>

          {loading ? (
            <LoadingSpinner message="Loading projects..." />
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ delay: index * 0.1 }}
                  className="card p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-sage-100 text-sage-700 rounded-full text-sm font-semibold">
                      {project.status}
                    </span>
                    {project.featured && (
                      <span className="px-3 py-1 bg-terracotta-100 text-terracotta-700 rounded-full text-sm font-semibold">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-3 text-earth-900">
                    {project.title}
                  </h3>
                  <p className="text-earth-600 mb-4">
                    {project.description}
                  </p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
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
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="card p-12 text-center">
              <FaSeedling className="text-5xl text-sage-400 mx-auto mb-4" />
              <p className="text-earth-600 text-lg">
                Projects are currently being documented. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Soil & Water Research */}
      <section className="section-padding bg-gradient-to-br from-earth-700 to-sage-800 text-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-serif font-bold mb-6">
              Soil & Water Research
            </h2>
            <p className="text-xl text-earth-50 leading-relaxed mb-8">
              Understanding the foundational elements of productive land. Our research 
              focuses on soil biology, mineral composition, water cycles, and their 
              interconnected relationships within the landscape.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <FaTint className="text-4xl mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">Water Management</h3>
                <p className="text-earth-100">
                  Designing systems for efficient water capture, storage, and distribution.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <FaMountain className="text-4xl mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">Soil Health</h3>
                <p className="text-earth-100">
                  Building living soil through regenerative practices and biology.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandLab;
