const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  content: {
    type: String,
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true,
    min: 1
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  resources: [{
    title: String,
    url: String,
    type: {
      type: String,
      enum: ['video', 'article', 'exercise', 'quiz', 'other']
    }
  }],
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }],
  order: {
    type: Number,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: Date,
  timeSpent: {
    type: Number,
    default: 0 // in minutes
  }
}, {
  timestamps: true
});

const milestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 500
  },
  lessons: [lessonSchema],
  order: {
    type: Number,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: Date,
  progress: {
    type: Number,
    default: 0 // percentage
  }
}, {
  timestamps: true
});

const learningChainSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  category: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'Full Stack', 'Mobile', 'Data Science', 'AI/ML', 'Design', 'DevOps', 'Other']
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: 50
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  estimatedDuration: {
    type: Number, // in hours
    required: true
  },
  milestones: [milestoneSchema],
  progress: {
    type: Number,
    default: 0 // percentage
  },
  status: {
    type: String,
    enum: ['active', 'paused', 'completed', 'archived'],
    default: 'active'
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date,
  totalTimeSpent: {
    type: Number,
    default: 0 // in minutes
  },
  currentMilestone: {
    type: Number,
    default: 0
  },
  currentLesson: {
    type: Number,
    default: 0
  },
  streak: {
    type: Number,
    default: 0
  },
  lastStudied: {
    type: Date,
    default: Date.now
  },
  settings: {
    dailyGoal: {
      type: Number,
      default: 30 // minutes
    },
    reminderTime: {
      type: String,
      default: '09:00'
    },
    autoAdvance: {
      type: Boolean,
      default: true
    }
  },
  analytics: {
    totalSessions: { type: Number, default: 0 },
    averageSessionLength: { type: Number, default: 0 },
    completionRate: { type: Number, default: 0 },
    lastWeekProgress: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Indexes for better performance
learningChainSchema.index({ author: 1, status: 1 });
learningChainSchema.index({ category: 1, isPublic: 1 });
learningChainSchema.index({ 'analytics.lastWeekProgress': -1 });
learningChainSchema.index({ createdAt: -1 });

// Virtual for total lessons count
learningChainSchema.virtual('totalLessons').get(function() {
  return this.milestones.reduce((total, milestone) => total + milestone.lessons.length, 0);
});

// Virtual for completed lessons count
learningChainSchema.virtual('completedLessons').get(function() {
  return this.milestones.reduce((total, milestone) => {
    return total + milestone.lessons.filter(lesson => lesson.isCompleted).length;
  }, 0);
});

// Method to calculate progress
learningChainSchema.methods.calculateProgress = function() {
  if (this.milestones.length === 0) return 0;
  
  const totalMilestones = this.milestones.length;
  const completedMilestones = this.milestones.filter(m => m.isCompleted).length;
  
  if (completedMilestones === totalMilestones) {
    this.progress = 100;
  } else {
    // Calculate progress based on completed lessons
    const totalLessons = this.totalLessons;
    const completedLessons = this.completedLessons;
    this.progress = Math.round((completedLessons / totalLessons) * 100);
  }
  
  return this.progress;
};

// Method to update current position
learningChainSchema.methods.updateCurrentPosition = function() {
  for (let i = 0; i < this.milestones.length; i++) {
    const milestone = this.milestones[i];
    if (!milestone.isCompleted) {
      this.currentMilestone = i;
      for (let j = 0; j < milestone.lessons.length; j++) {
        const lesson = milestone.lessons[j];
        if (!lesson.isCompleted) {
          this.currentLesson = j;
          break;
        }
      }
      break;
    }
  }
};

// Method to mark lesson as completed
learningChainSchema.methods.completeLesson = function(milestoneIndex, lessonIndex) {
  if (milestoneIndex >= 0 && milestoneIndex < this.milestones.length) {
    const milestone = this.milestones[milestoneIndex];
    if (lessonIndex >= 0 && lessonIndex < milestone.lessons.length) {
      const lesson = milestone.lessons[lessonIndex];
      lesson.isCompleted = true;
      lesson.completedAt = new Date();
      
      // Update milestone progress
      const completedLessons = milestone.lessons.filter(l => l.isCompleted).length;
      milestone.progress = Math.round((completedLessons / milestone.lessons.length) * 100);
      
      if (milestone.progress === 100) {
        milestone.isCompleted = true;
        milestone.completedAt = new Date();
      }
      
      // Update overall progress
      this.calculateProgress();
      this.updateCurrentPosition();
      
      return this.save();
    }
  }
  throw new Error('Invalid milestone or lesson index');
};

// Method to get next lesson
learningChainSchema.methods.getNextLesson = function() {
  for (let i = this.currentMilestone; i < this.milestones.length; i++) {
    const milestone = this.milestones[i];
    for (let j = this.currentLesson; j < milestone.lessons.length; j++) {
      const lesson = milestone.lessons[j];
      if (!lesson.isCompleted) {
        return { milestoneIndex: i, lessonIndex: j, lesson };
      }
    }
  }
  return null; // All lessons completed
};

module.exports = mongoose.model('LearningChain', learningChainSchema);
