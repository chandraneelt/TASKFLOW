const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all tasks for authenticated user
router.get('/', auth, [
  query('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),
  query('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  query('search').optional().isLength({ max: 100 }).withMessage('Search term too long'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { status, priority, search, page = 1, limit = 10 } = req.query;
    const userId = req.user._id;

    // Build query object
    const query = { userId };
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Task.countDocuments(query);

    res.json({
      tasks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new task
router.post('/', auth, [
  body('title').trim().isLength({ min: 1, max: 100 }).withMessage('Title is required and must be 1-100 characters'),
  body('description').optional().isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  body('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  body('dueDate').optional().isISO8601().withMessage('Due date must be a valid date')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { title, description, status, priority, dueDate } = req.body;
    const userId = req.user._id;

    const task = new Task({
      title,
      description,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      userId
    });

    await task.save();

    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Server error during task creation' });
  }
});

// Get single task
router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ task });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update task
router.put('/:id', auth, [
  body('title').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Title must be 1-100 characters'),
  body('description').optional().isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  body('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  body('dueDate').optional().isISO8601().withMessage('Due date must be a valid date')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { title, description, status, priority, dueDate } = req.body;
    const updateData = {};
    
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (priority !== undefined) updateData.priority = priority;
    if (dueDate !== undefined) updateData.dueDate = new Date(dueDate);

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Server error during task update' });
  }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Server error during task deletion' });
  }
});

module.exports = router;