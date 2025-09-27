const express = require('express');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const LearningChain = require('../models/LearningChain');
const User = require('../models/User');

const router = express.Router();

// Get all chains for authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const chains = await LearningChain.find({ author: req.user.id })
      .populate('author', 'username firstName lastName avatar')
      .sort({ createdAt: -1 });

    res.json({ chains });
  } catch (error) {
    console.error('Get chains error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get public chains
router.get('/public', async (req, res) => {
  try {
    const { category, difficulty, limit = 20, page = 1 } = req.query;
    
    const filter = { isPublic: true };
    if (category && category !== 'All') filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const chains = await LearningChain.find(filter)
      .populate('author', 'username firstName lastName avatar isVerified')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await LearningChain.countDocuments(filter);

    res.json({ 
      chains, 
      pagination: { 
        page: parseInt(page), 
        limit: parseInt(limit), 
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get public chains error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single chain by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const chain = await LearningChain.findById(req.params.id)
      .populate('author', 'username firstName lastName avatar isVerified');

    if (!chain) {
      return res.status(404).json({ error: 'Learning chain not found' });
    }

    // Check if user can access this chain
    if (!chain.isPublic && chain.author._id.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ chain });
  } catch (error) {
    console.error('Get chain error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new learning chain
router.post('/', [
  auth,
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category').isIn(['Frontend', 'Backend', 'Full Stack', 'Mobile', 'Data Science', 'AI/ML', 'Design', 'DevOps', 'Other']),
  body('estimatedDuration').isNumeric().withMessage('Estimated duration must be a number'),
  body('difficulty').isIn(['beginner', 'intermediate', 'advanced'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }

    const { title, description, category, tags, difficulty, estimatedDuration, milestones } = req.body;

    const chain = new LearningChain({
      title,
      description,
      category,
      tags: tags || [],
      difficulty,
      estimatedDuration,
      author: req.user.id,
      milestones: milestones || []
    });

    await chain.save();

    // Update user stats
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { 'stats.totalChains': 1 }
    });

    res.status(201).json({ 
      message: 'Learning chain created successfully',
      chain 
    });

  } catch (error) {
    console.error('Create chain error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update learning chain
router.put('/:id', [
  auth,
  body('title').optional().notEmpty(),
  body('description').optional().notEmpty(),
  body('category').optional().isIn(['Frontend', 'Backend', 'Full Stack', 'Mobile', 'Data Science', 'AI/ML', 'Design', 'DevOps', 'Other']),
  body('difficulty').optional().isIn(['beginner', 'intermediate', 'advanced'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }

    const chain = await LearningChain.findById(req.params.id);

    if (!chain) {
      return res.status(404).json({ error: 'Learning chain not found' });
    }

    if (chain.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updatedChain = await LearningChain.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json({ 
      message: 'Learning chain updated successfully',
      chain: updatedChain 
    });

  } catch (error) {
    console.error('Update chain error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete learning chain
router.delete('/:id', auth, async (req, res) => {
  try {
    const chain = await LearningChain.findById(req.params.id);

    if (!chain) {
      return res.status(404).json({ error: 'Learning chain not found' });
    }

    if (chain.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await LearningChain.findByIdAndDelete(req.params.id);

    // Update user stats
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { 'stats.totalChains': -1 }
    });

    res.json({ message: 'Learning chain deleted successfully' });

  } catch (error) {
    console.error('Delete chain error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Mark lesson as completed
router.post('/:id/complete-lesson', [
  auth,
  body('milestoneIndex').isNumeric(),
  body('lessonIndex').isNumeric()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }

    const { milestoneIndex, lessonIndex } = req.body;
    const chain = await LearningChain.findById(req.params.id);

    if (!chain) {
      return res.status(404).json({ error: 'Learning chain not found' });
    }

    if (chain.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await chain.completeLesson(milestoneIndex, lessonIndex);

    res.json({ 
      message: 'Lesson completed successfully',
      chain 
    });

  } catch (error) {
    console.error('Complete lesson error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
