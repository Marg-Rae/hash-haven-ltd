import Post from '../models/Post.js';

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getAllPosts = async (req, res) => {
  try {
    const { category, featured, limit } = req.query;
    
    let query = { published: true };
    
    if (category) query.category = category;
    if (featured) query.featured = featured === 'true';
    
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(limit ? parseInt(limit) : 0);
    
    res.json({
      status: 'success',
      count: posts.length,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get single post by slug
// @route   GET /api/posts/:slug
// @access  Public
export const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug, published: true });
    
    if (!post) {
      return res.status(404).json({
        status: 'error',
        message: 'Post not found'
      });
    }
    
    // Increment views
    post.views += 1;
    await post.save();
    
    res.json({
      status: 'success',
      data: post
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Create new post
// @route   POST /api/posts
// @access  Private (add authentication later)
export const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: post
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!post) {
      return res.status(404).json({
        status: 'error',
        message: 'Post not found'
      });
    }
    
    res.json({
      status: 'success',
      data: post
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        status: 'error',
        message: 'Post not found'
      });
    }
    
    res.json({
      status: 'success',
      message: 'Post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
