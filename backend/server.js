// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ----------------------
// Security Middleware
// ----------------------
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// ----------------------
// Rate Limiting
// ----------------------
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// ----------------------
// General Middleware
// ----------------------
app.use(compression());
app.use(morgan('combined'));

// CORS configuration (allow Vite dev server by default)
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:8080',
      'http://localhost:8081',
      'http://127.0.0.1:8080',
      'http://127.0.0.1:8081',
      process.env.FRONTEND_URL
    ].filter(Boolean);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization,x-auth-token',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ----------------------
// Database Connection
// ----------------------
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pathmind-ai')
.then(() => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('✅ Connected to MongoDB');
  }
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// ----------------------
// Routes
// ----------------------
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/chains', require('./routes/chains'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/coach', require('./routes/coach'));
app.use('/api/community', require('./routes/community'));
app.use('/api/library', require('./routes/library'));
app.use('/api/analytics', require('./routes/analytics'));

// Additional routes for frontend compatibility
app.use('/api/today', require('./routes/users')); // Today's data is in users route
app.use('/api/user/progress', require('./routes/progress')); // Progress route

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ✅ NEW: API root route
// Place BEFORE the error and 404 handlers
app.get('/api', (req, res) => {
  res.json({
    message: 'API root is alive',
    endpoints: [
      '/api/health',
      '/api/auth',
      '/api/users',
      '/api/chains',
      '/api/progress',
      '/api/coach',
      '/api/community',
      '/api/library',
      '/api/analytics'
    ]
  });
});

// ----------------------
// Error Handling Middleware
// ----------------------
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// ----------------------
// 404 Handler
// ----------------------
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ----------------------
// Start Server
// ----------------------
app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 API URL: http://localhost:${PORT}/api`);
  }
});

module.exports = app;
