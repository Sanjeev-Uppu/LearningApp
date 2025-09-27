const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// Get user progress summary
router.get('/', auth, async (req, res) => {
  try {
    const User = require('../models/User');
    const LearningChain = require('../models/LearningChain');
    
    const user = await User.findById(req.user.id);
    const chains = await LearningChain.find({ user: req.user.id });
    
    const totalLessons = chains.reduce((total, chain) => total + chain.totalLessons, 0);
    const completedLessons = chains.reduce((total, chain) => total + chain.completedLessons, 0);
    
    const stats = {
      totalStudyTime: (user.totalStudyTime || 0) / 60, // Convert to hours
      completionRate: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
      currentStreak: user.currentStreak,
      level: user.level,
      totalXP: user.xp,
      averageDailyTime: 2.5,
      bestDayHours: 4,
      totalTasks: totalLessons,
      longestStreak: user.longestStreak || 0
    };
    
    const progressData = {
      weeklyData: [
        { day: 'Mon', hours: 2, tasks: 3 },
        { day: 'Tue', hours: 1.5, tasks: 2 },
        { day: 'Wed', hours: 3, tasks: 4 },
        { day: 'Thu', hours: 2.5, tasks: 3 },
        { day: 'Fri', hours: 1, tasks: 1 },
        { day: 'Sat', hours: 0.5, tasks: 1 },
        { day: 'Sun', hours: 1, tasks: 2 }
      ],
      monthlyData: [
        { week: 'Week 1', hours: 12, tasks: 18 },
        { week: 'Week 2', hours: 15, tasks: 22 },
        { week: 'Week 3', hours: 18, tasks: 25 },
        { week: 'Week 4', hours: 14, tasks: 20 }
      ],
      subjectBreakdown: [
        { name: 'Frontend', value: 40, color: '#3B82F6' },
        { name: 'Backend', value: 30, color: '#10B981' },
        { name: 'DevOps', value: 20, color: '#F59E0B' },
        { name: 'Other', value: 10, color: '#EF4444' }
      ],
      streakData: [
        { month: 'Jan', streak: 15 },
        { month: 'Feb', streak: 22 },
        { month: 'Mar', streak: 18 },
        { month: 'Apr', streak: 25 }
      ]
    };
    
    const insights = {
      workingWell: [
        'Consistent daily learning habit',
        'Good progress on frontend development',
        'Maintaining steady streak'
      ],
      improvements: [
        'Increase study time on weekends',
        'Focus more on backend concepts',
        'Add more practical exercises'
      ]
    };

    res.json({ stats, progressData, insights });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Get progress error:', error);
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Record study session
router.post('/session', auth, async (req, res) => {
  try {
    const { duration, chainId, lessonId } = req.body;
    
    // TODO: Implement session recording
    // For now, just return success
    res.json({ 
      message: 'Study session recorded',
      session: {
        id: Date.now(),
        duration,
        chainId,
        lessonId,
        recordedAt: new Date()
      }
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Record session error:', error);
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Get progress analytics
router.get('/analytics', auth, async (req, res) => {
  try {
    const { period = 'week' } = req.query;
    
    // TODO: Implement analytics
    const analytics = {
      period,
      totalTime: 0,
      averageTime: 0,
      sessions: 0,
      consistency: 0
    };

    res.json({ analytics });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Get analytics error:', error);
    }
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
