const express = require('express');
const LearningChain = require('../models/LearningChain');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all chains for current user
router.get('/', auth, async (req, res) => {
  try {
    const chains = await LearningChain.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(chains);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Get chains error:', error);
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Get public chains (for community features)
router.get('/public', async (req, res) => {
  try {
    const chains = await LearningChain.find({ isPublic: true })
      .populate('user', 'username firstName lastName')
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(chains);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Get public chains error:', error);
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single chain
router.get('/:id', auth, async (req, res) => {
  try {
    const chain = await LearningChain.findOne({ _id: req.params.id, user: req.user.id });
    if (!chain) {
      return res.status(404).json({ error: 'Chain not found' });
    }
    res.json(chain);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Get chain error:', error);
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new chain
router.post('/', auth, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      difficulty,
      estimatedDuration,
      goals,
      isPublic = false
    } = req.body;

    const newChain = new LearningChain({
      user: req.user.id,
      title,
      description,
      category,
      difficulty,
      estimatedDuration,
      goals,
      isPublic
    });

    const chain = await newChain.save();
    res.status(201).json(chain);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Create chain error:', error);
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Update chain
router.put('/:id', auth, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      difficulty,
      estimatedDuration,
      goals,
      isPublic
    } = req.body;

    const chain = await LearningChain.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      {
        title,
        description,
        category,
        difficulty,
        estimatedDuration,
        goals,
        isPublic
      },
      { new: true }
    );

    if (!chain) {
      return res.status(404).json({ error: 'Chain not found' });
    }

    res.json(chain);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Update chain error:', error);
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete chain
router.delete('/:id', auth, async (req, res) => {
  try {
    const chain = await LearningChain.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!chain) {
      return res.status(404).json({ error: 'Chain not found' });
    }
    res.json({ message: 'Chain removed' });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Delete chain error:', error);
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Complete a lesson in a chain
router.post('/:id/complete-lesson', auth, async (req, res) => {
  try {
    const { lessonIndex, timeSpent, notes } = req.body;
    
    const chain = await LearningChain.findOne({ _id: req.params.id, user: req.user.id });
    if (!chain) {
      return res.status(404).json({ error: 'Chain not found' });
    }

    // Update lesson completion
    if (chain.lessons[lessonIndex]) {
      chain.lessons[lessonIndex].completed = true;
      chain.lessons[lessonIndex].completedAt = new Date();
      chain.lessons[lessonIndex].timeSpent = timeSpent;
      chain.lessons[lessonIndex].notes = notes;
      
      // Update progress
      const completedLessons = chain.lessons.filter(lesson => lesson.completed).length;
      chain.progress = Math.round((completedLessons / chain.lessons.length) * 100);
      
      await chain.save();
    }

    res.json(chain);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Complete lesson error:', error);
    }
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
