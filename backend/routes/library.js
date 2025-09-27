const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// Get library plans
router.get('/plans', auth, async (req, res) => {
  try {
    const plans = [
      {
        id: 1,
        title: 'Complete React Developer Course',
        description: 'Master React from basics to advanced concepts including hooks, context, and state management.',
        category: 'Frontend',
        difficulty: 'Intermediate',
        duration: '8 weeks',
        rating: 4.8,
        likes: 156,
        views: 2340,
        downloads: 892,
        lastUpdated: '2 days ago',
        featured: true,
        tags: ['React', 'JavaScript', 'Frontend', 'Hooks', 'State Management'],
        author: {
          name: 'Sarah Johnson',
          avatar: '',
          verified: true
        }
      },
      {
        id: 2,
        title: 'Node.js Backend Mastery',
        description: 'Build robust backend applications with Node.js, Express, and MongoDB.',
        category: 'Backend',
        difficulty: 'Advanced',
        duration: '10 weeks',
        rating: 4.9,
        likes: 203,
        views: 1890,
        downloads: 654,
        lastUpdated: '1 week ago',
        featured: true,
        tags: ['Node.js', 'Express', 'MongoDB', 'Backend', 'API'],
        author: {
          name: 'Mike Rodriguez',
          avatar: '',
          verified: true
        }
      },
      {
        id: 3,
        title: 'Python Data Science Fundamentals',
        description: 'Learn data analysis, visualization, and machine learning with Python.',
        category: 'Data Science',
        difficulty: 'Beginner',
        duration: '6 weeks',
        rating: 4.7,
        likes: 134,
        views: 1567,
        downloads: 423,
        lastUpdated: '3 days ago',
        featured: false,
        tags: ['Python', 'Data Science', 'Pandas', 'Matplotlib', 'Machine Learning'],
        author: {
          name: 'Emma Wilson',
          avatar: '',
          verified: false
        }
      },
      {
        id: 4,
        title: 'Full Stack JavaScript Development',
        description: 'Complete guide to building full-stack applications with JavaScript, React, and Node.js.',
        category: 'Full Stack',
        difficulty: 'Intermediate',
        duration: '12 weeks',
        rating: 4.6,
        likes: 189,
        views: 2100,
        downloads: 567,
        lastUpdated: '5 days ago',
        featured: true,
        tags: ['JavaScript', 'React', 'Node.js', 'Full Stack', 'MongoDB'],
        author: {
          name: 'David Kim',
          avatar: '',
          verified: true
        }
      },
      {
        id: 5,
        title: 'Mobile App Development with React Native',
        description: 'Create cross-platform mobile applications using React Native.',
        category: 'Mobile',
        difficulty: 'Intermediate',
        duration: '8 weeks',
        rating: 4.5,
        likes: 98,
        views: 1234,
        downloads: 312,
        lastUpdated: '1 week ago',
        featured: false,
        tags: ['React Native', 'Mobile', 'JavaScript', 'iOS', 'Android'],
        author: {
          name: 'Lisa Brown',
          avatar: '',
          verified: false
        }
      }
    ];

    res.json(plans);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Get library plans error:', error);
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Clone a learning plan
router.post('/plans/:id/clone', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // TODO: Implement actual cloning logic
    // For now, just return success
    res.json({
      message: 'Plan cloned successfully',
      planId: id,
      clonedAt: new Date()
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Clone plan error:', error);
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Like a learning plan
router.post('/plans/:id/like', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // TODO: Implement actual liking logic
    // For now, just return success
    res.json({
      message: 'Plan liked successfully',
      planId: id,
      likedAt: new Date()
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Like plan error:', error);
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Get plan details
router.get('/plans/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // TODO: Implement actual plan details retrieval
    // For now, return mock data
    const plan = {
      id: parseInt(id),
      title: 'Complete React Developer Course',
      description: 'Master React from basics to advanced concepts including hooks, context, and state management.',
      category: 'Frontend',
      difficulty: 'Intermediate',
      duration: '8 weeks',
      rating: 4.8,
      likes: 156,
      views: 2340,
      downloads: 892,
      lastUpdated: '2 days ago',
      featured: true,
      tags: ['React', 'JavaScript', 'Frontend', 'Hooks', 'State Management'],
      author: {
        name: 'Sarah Johnson',
        avatar: '',
        verified: true
      },
      milestones: [
        {
          title: 'React Basics',
          description: 'Learn the fundamentals of React',
          lessons: [
            { title: 'Introduction to React', duration: '30 min' },
            { title: 'Components and JSX', duration: '45 min' },
            { title: 'Props and State', duration: '60 min' }
          ]
        },
        {
          title: 'Advanced React',
          description: 'Master advanced React concepts',
          lessons: [
            { title: 'React Hooks', duration: '90 min' },
            { title: 'Context API', duration: '60 min' },
            { title: 'Performance Optimization', duration: '75 min' }
          ]
        }
      ]
    };

    res.json(plan);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Get plan details error:', error);
    }
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
