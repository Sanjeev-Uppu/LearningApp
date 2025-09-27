const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  avatar: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    maxlength: 500,
    default: ''
  },
  level: {
    type: Number,
    default: 1
  },
  xp: {
    type: Number,
    default: 0
  },
  currentStreak: {
    type: Number,
    default: 0
  },
  longestStreak: {
    type: Number,
    default: 0
  },
  totalStudyTime: {
    type: Number,
    default: 0 // in minutes
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'auto'
    },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      reminders: { type: Boolean, default: true }
    },
    timezone: {
      type: String,
      default: 'UTC'
    }
  },
  stats: {
    totalChains: { type: Number, default: 0 },
    completedChains: { type: Number, default: 0 },
    totalLessons: { type: Number, default: 0 },
    completedLessons: { type: Number, default: 0 },
    averageStudyTime: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now }
  },
  badges: [{
    name: String,
    description: String,
    earnedAt: { type: Date, default: Date.now },
    icon: String
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better performance (email and username are already indexed by unique: true)
userSchema.index({ 'stats.lastActive': -1 });
userSchema.index({ currentStreak: -1 });
userSchema.index({ xp: -1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for level calculation
userSchema.virtual('levelInfo').get(function() {
  const level = Math.floor(this.xp / 1000) + 1;
  const xpForNextLevel = (level * 1000) - this.xp;
  return { level, xpForNextLevel, progress: (this.xp % 1000) / 1000 };
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to update streak
userSchema.methods.updateStreak = function() {
  const now = new Date();
  const lastActive = this.stats.lastActive;
  const oneDay = 24 * 60 * 60 * 1000;
  
  if (now - lastActive <= oneDay) {
    this.currentStreak += 1;
    if (this.currentStreak > this.longestStreak) {
      this.longestStreak = this.currentStreak;
    }
  } else if (now - lastActive > oneDay) {
    this.currentStreak = 1;
  }
  
  this.stats.lastActive = now;
  return this.save();
};

// Method to add XP
userSchema.methods.addXP = function(amount) {
  this.xp += amount;
  const newLevel = Math.floor(this.xp / 1000) + 1;
  
  if (newLevel > this.level) {
    this.level = newLevel;
    // Could trigger level up notification here
  }
  
  return this.save();
};

// Method to get public profile (without sensitive data)
userSchema.methods.getPublicProfile = function() {
  return {
    _id: this._id,
    username: this.username,
    firstName: this.firstName,
    lastName: this.lastName,
    avatar: this.avatar,
    bio: this.bio,
    level: this.level,
    xp: this.xp,
    currentStreak: this.currentStreak,
    longestStreak: this.longestStreak,
    stats: this.stats,
    badges: this.badges,
    isVerified: this.isVerified,
    createdAt: this.createdAt
  };
};

module.exports = mongoose.model('User', userSchema);
