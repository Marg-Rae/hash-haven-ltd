import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Post from './models/Post.js';
import Project from './models/Project.js';

dotenv.config();

const samplePosts = [
  {
    title: 'Welcome to HashHaven Ltd',
    excerpt: 'Beginning our journey in regenerative systems, modern homesteading, and digital innovation.',
    content: `Welcome to HashHaven Ltd! We're embarking on an exciting journey that bridges the digital and physical worlds, combining regenerative land management with innovative technology solutions.

Our mission is to build systems that strengthen resilience, foster regeneration, and honor the interconnection between land, technology, and human flourishing.

This blog will document our learnings, discoveries, and insights as we explore:
- Regenerative agriculture and land stewardship
- GIS mapping and spatial analysis
- Modern homesteading practices
- Digital tool development
- Geological research
- And much more...

Join us on this journey toward a more sustainable and resilient future.`,
    category: 'Journey',
    tags: ['welcome', 'launch', 'introduction'],
    featured: true,
    author: 'HashHaven Team'
  },
  {
    title: 'Understanding Soil Biology: The Foundation of Regenerative Agriculture',
    excerpt: 'Exploring the intricate world beneath our feet and how healthy soil is the key to productive, resilient land.',
    content: `Soil is more than just dirt—it's a living ecosystem teeming with billions of organisms working together to create the foundation for all terrestrial life.

In regenerative agriculture, we focus on building soil health through:

1. Increasing Organic Matter
Adding compost, cover crops, and mulch increases the soil's ability to hold water and nutrients.

2. Supporting Microbial Life
Bacteria, fungi, protozoa, and other microorganisms break down organic matter and make nutrients available to plants.

3. Minimizing Disturbance
No-till or reduced-till practices preserve soil structure and protect microbial networks.

4. Maintaining Living Roots
Cover crops and perennials keep living roots in the soil year-round, feeding microbes and preventing erosion.

The result? Healthier plants, increased yields, improved water retention, and carbon sequestration that helps combat climate change.

Our research at the Land Lab focuses on practical applications of these principles, using both traditional knowledge and modern analytical tools like soil testing and GIS mapping.`,
    category: 'Land Lab',
    tags: ['soil', 'regenerative agriculture', 'biology'],
    featured: true,
    author: 'HashHaven Team'
  },
  {
    title: 'Building Modern Web Applications: Lessons from the Digital Forge',
    excerpt: 'Key principles for creating robust, user-centered web applications that solve real problems.',
    content: `In our Digital Forge, we build web applications with a focus on purpose, usability, and sustainability.

Here are our core principles:

**1. User-Centered Design**
Technology should serve people, not the other way around. We start every project by understanding user needs.

**2. Performance Matters**
Fast load times and smooth interactions aren't luxuries—they're essential for accessibility and user satisfaction.

**3. Clean, Maintainable Code**
Write code that your future self (and others) can understand. Documentation and clear structure save time and headaches.

**4. Progressive Enhancement**
Build core functionality first, then enhance with JavaScript. Ensure your app works even when things fail.

**5. Security by Design**
Protect user data from the start. Validate inputs, use HTTPS, implement proper authentication.

**6. Continuous Learning**
Technology evolves rapidly. Stay curious, experiment with new tools, but don't chase trends blindly.

Our tech stack—React, Node.js, MongoDB, Tailwind CSS—reflects these values: modern, efficient, and well-supported by the community.`,
    category: 'Digital Forge',
    tags: ['web development', 'programming', 'best practices'],
    featured: true,
    author: 'HashHaven Team'
  },
  {
    title: 'GIS Mapping for Land Management: From Data to Decisions',
    excerpt: 'How geographic information systems help us make better decisions about land use and conservation.',
    content: `Geographic Information Systems (GIS) are powerful tools for understanding and managing land. By combining spatial data with analytical capabilities, we can visualize patterns, model scenarios, and make informed decisions.

**Our GIS Applications:**

1. Topographic Analysis
Understanding elevation, slope, and aspect helps plan water management and building placement.

2. Hydrological Modeling
Mapping water flow patterns informs pond placement, swale design, and erosion prevention.

3. Soil Mapping
Different soil types require different management approaches. GIS helps us map and manage soil diversity.

4. Vegetation Monitoring
Track plant health, growth patterns, and ecosystem changes over time.

5. Access Planning
Optimize road and trail placement for minimal environmental impact and maximum efficiency.

**Tools We Use:**
- QGIS (open-source GIS software)
- Leaflet/Mapbox (web mapping)
- OpenStreetMap data
- Satellite imagery
- Custom data collection

By integrating GIS with on-the-ground observation and traditional knowledge, we create comprehensive land management strategies that honor both science and place.`,
    category: 'Research',
    tags: ['GIS', 'mapping', 'technology', 'land management'],
    featured: false,
    author: 'HashHaven Team'
  }
];

const sampleProjects = [
  {
    title: 'Interactive Land Mapping Platform',
    description: 'GIS-based web application for visualizing and analyzing land data with multiple layer support.',
    longDescription: 'A comprehensive mapping platform that integrates topographic data, soil information, water systems, and vegetation patterns into an interactive web interface.',
    category: 'Land Lab',
    technologies: ['React', 'Leaflet', 'MongoDB', 'Node.js', 'Express'],
    status: 'In Progress',
    featured: true,
    order: 1
  },
  {
    title: 'Soil Health Monitoring System',
    description: 'Database and dashboard for tracking soil test results, amendments, and improvement over time.',
    longDescription: 'Track soil composition, pH, nutrients, and organic matter levels across different zones, with data visualization and trend analysis.',
    category: 'Land Lab',
    technologies: ['React', 'Chart.js', 'MongoDB', 'Express'],
    status: 'Planning',
    featured: false,
    order: 2
  },
  {
    title: 'HashHaven Ltd Website',
    description: 'Modern, full-stack web application showcasing our work in regenerative systems and digital innovation.',
    longDescription: 'A beautifully designed, responsive website built with React, featuring a blog system, project portfolio, and contact functionality.',
    category: 'Digital Forge',
    technologies: ['React', 'Tailwind CSS', 'MongoDB', 'Express', 'Node.js', 'Framer Motion'],
    status: 'Completed',
    featured: true,
    githubUrl: 'https://github.com/yourusername/hash-haven-ltd',
    liveUrl: 'https://hashhaven.netlify.app',
    order: 1
  },
  {
    title: 'Water Catchment Calculator',
    description: 'Tool for calculating potential rainwater harvest based on roof area, rainfall data, and storage capacity.',
    longDescription: 'Interactive calculator with visualization showing monthly water availability and storage recommendations.',
    category: 'Homestead',
    technologies: ['React', 'Chart.js'],
    status: 'Planning',
    featured: false,
    order: 3
  },
  {
    title: 'Regenerative Agriculture Resource Hub',
    description: 'Curated collection of research papers, case studies, and practical guides for regenerative land management.',
    longDescription: 'Centralized repository of knowledge with search, filtering, and contribution capabilities.',
    category: 'Research',
    technologies: ['React', 'MongoDB', 'Full-text search'],
    status: 'Planning',
    featured: false,
    order: 4
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Post.deleteMany({});
    await Project.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert sample posts
    const posts = await Post.insertMany(samplePosts);
    console.log(`✅ Added ${posts.length} sample posts`);

    // Insert sample projects
    const projects = await Project.insertMany(sampleProjects);
    console.log(`✅ Added ${projects.length} sample projects`);

    console.log('\n🎉 Database seeded successfully!\n');
    console.log('Sample Posts:');
    posts.forEach(post => {
      console.log(`  - ${post.title} (${post.category})`);
    });
    console.log('\nSample Projects:');
    projects.forEach(project => {
      console.log(`  - ${project.title} (${project.category})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
