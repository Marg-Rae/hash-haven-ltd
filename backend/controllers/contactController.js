import Contact from '../models/Contact.js';

// @desc    Get all contact submissions
// @route   GET /api/contact
// @access  Private (add authentication later)
export const getAllContacts = async (req, res) => {
  try {
    const { status } = req.query;
    
    let query = {};
    if (status) query.status = status;
    
    const contacts = await Contact.find(query).sort({ createdAt: -1 });
    
    res.json({
      status: 'success',
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get single contact
// @route   GET /api/contact/:id
// @access  Private
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact not found'
      });
    }
    
    // Mark as read
    if (contact.status === 'New') {
      contact.status = 'Read';
      await contact.save();
    }
    
    res.json({
      status: 'success',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Create contact submission
// @route   POST /api/contact
// @access  Public
export const createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    
    // TODO: Send email notification
    
    res.status(201).json({
      status: 'success',
      message: 'Thank you for reaching out! We will get back to you soon.',
      data: contact
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private
export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact not found'
      });
    }
    
    res.json({
      status: 'success',
      data: contact
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact not found'
      });
    }
    
    res.json({
      status: 'success',
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
