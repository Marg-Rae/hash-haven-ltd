import Project from '../models/Project.js';
import createHttpError from '../utils/httpError.js';

const validateCoordinates = (payload, { required = false } = {}) => {
  const latRaw = payload.latitude;
  const lngRaw = payload.longitude;

  if (required && (latRaw === undefined || lngRaw === undefined)) {
    throw createHttpError(400, 'Latitude and longitude are required');
  }

  if (latRaw === undefined && lngRaw === undefined) {
    return {};
  }

  if (latRaw === undefined || lngRaw === undefined) {
    throw createHttpError(400, 'Both latitude and longitude are required');
  }

  const latitude = Number(latRaw);
  const longitude = Number(lngRaw);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    throw createHttpError(400, 'Latitude and longitude must be valid numbers');
  }

  if (latitude < -90 || latitude > 90) {
    throw createHttpError(400, 'Latitude must be between -90 and 90');
  }

  if (longitude < -180 || longitude > 180) {
    throw createHttpError(400, 'Longitude must be between -180 and 180');
  }

  return { latitude, longitude };
};

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getAllProjects = async (req, res, next) => {
  try {
    const { category, featured, status } = req.query;
    
    let query = {};
    
    if (category) query.category = category;
    if (featured) query.featured = featured === 'true';
    if (status) query.status = status;
    
    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
    
    res.json({
      status: 'success',
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return next(createHttpError(404, 'Project not found'));
    }
    
    res.json({
      status: 'success',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
export const createProject = async (req, res, next) => {
  try {
    const coordinates = validateCoordinates(req.body, { required: true });
    const project = await Project.create({
      ...req.body,
      ...coordinates
    });
    
    res.status(201).json({
      status: 'success',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
export const updateProject = async (req, res, next) => {
  try {
    const coordinates = validateCoordinates(req.body);
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        ...coordinates
      },
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return next(createHttpError(404, 'Project not found'));
    }
    
    res.json({
      status: 'success',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return next(createHttpError(404, 'Project not found'));
    }
    
    res.json({
      status: 'success',
      message: 'Project deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
