const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Get profile error:', error);
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { firstName, lastName, avatar, preferences } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, avatar, preferences },
      { new: true }
    ).select('-password');

    res.json({ user });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Update profile error:', error);
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user stats
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('level xp currentStreak longestStreak totalStudyTime');
    
    const stats = {
      level: user.level,
      xp: user.xp,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      totalStudyTime: user.totalStudyTime || 0
    };

    res.json({ stats });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Get stats error:', error);
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Get dashboard data
router.get('/dashboard', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('level xp currentStreak totalStudyTime');
    const LearningChain = require('../models/LearningChain');
    
    // Get active chains
    const activeChains = await LearningChain.find({ 
      user: req.user.id, 
      status: { $in: ['active', 'paused'] } 
    }).select('title progress status');
    
    const stats = {
      currentStreak: user.currentStreak,
      totalXP: user.xp,
      activeChains: activeChains.length,
      weeklyStudyTime: Math.round((user.totalStudyTime || 0) / 60), // Convert minutes to hours
      weeklyProgress: [
        { day: 'Mon', hours: 2 },
        { day: 'Tue', hours: 1.5 },
        { day: 'Wed', hours: 3 },
        { day: 'Thu', hours: 2.5 },
        { day: 'Fri', hours: 1 },
        { day: 'Sat', hours: 0.5 },
        { day: 'Sun', hours: 1 }
      ],
      activeChainsData: activeChains.map(chain => ({
        name: chain.title,
        completion: chain.progress
      }))
    };

    res.json(stats);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Get dashboard error:', error);
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Get today's data
router.get('/today', auth, async (req, res) => {
  try {
    const LearningChain = require('../models/LearningChain');
    
    // Get today's tasks from active chains
    const activeChains = await LearningChain.find({ 
      user: req.user.id, 
      status: { $in: ['active', 'paused'] } 
    }).select('title progress tasks');
    
    const todayTasks = [];
    activeChains.forEach(chain => {
      if (chain.tasks && chain.tasks.length > 0) {
        chain.tasks.forEach(task => {
          todayTasks.push({
            id: task._id,
            title: task.title,
            chain: chain.title,
            estimatedTime: task.estimatedTime || '30 min',
            completed: task.completed || false,
            priority: task.priority || 'medium'
          });
        });
      }
    });
    
    const data = {
      todayTasks: todayTasks.slice(0, 5), // Limit to 5 tasks
      yesterdayWork: "Completed React hooks tutorial and practiced useState",
      todayPlan: "Focus on useEffect and custom hooks",
      tomorrowPlan: "Start building a small React project",
      suggestions: [
        "Take a 5-minute break every 25 minutes",
        "Review yesterday's notes before starting new content",
        "Set a specific time for your study session"
      ]
    };

    res.json(data);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Get today data error:', error);
    }
    res.status(500).json({ error: 'Server error' });
  }
});


// Get user settings
router.get('/settings', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('preferences');
    
    const settings = {
      theme: user.preferences?.theme || 'auto',
      notifications: {
        email: user.preferences?.notifications?.email || true,
        push: user.preferences?.notifications?.push || true,
        reminders: user.preferences?.notifications?.reminders || true
      },
      study: {
        dailyGoal: '2',
        reminderTime: '09:00',
        autoAdvance: true
      },
      privacy: {
        profileVisibility: true,
        showProgress: true,
        allowMessages: true
      }
    };

    res.json(settings);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Get settings error:', error);
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user settings
router.put('/settings', auth, async (req, res) => {
  try {
    const { theme, notifications, study, privacy } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        preferences: {
          theme,
          notifications,
          study,
          privacy
        }
      },
      { new: true }
    ).select('preferences');

    res.json(user.preferences);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Update settings error:', error);
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find({})
      .select('username firstName lastName level xp currentStreak')
      .sort({ xp: -1, currentStreak: -1 })
      .limit(50);

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      level: user.level,
      xp: user.xp,
      currentStreak: user.currentStreak
    }));

    res.json({ leaderboard });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Get leaderboard error:', error);
    }
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
