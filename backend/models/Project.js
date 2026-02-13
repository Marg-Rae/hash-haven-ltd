import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  longDescription: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['Land Lab', 'Digital Forge', 'GIS', 'Homestead', 'Research'],
    required: true
  },
  technologies: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['Planning', 'In Progress', 'Completed', 'Ongoing'],
    default: 'In Progress'
  },
  featured: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    default: ''
  },
  githubUrl: {
    type: String,
    default: ''
  },
  liveUrl: {
    type: String,
    default: ''
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  completionDate: {
    type: Date
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
