# ConsistAI - AI-Powered Learning Consistency Platform

A comprehensive learning platform that helps users maintain consistent study habits through AI-powered recovery plans, smart analytics, and a supportive community.

## 🚀 Features

- **AI-Powered Learning Recovery**: Get personalized recovery plans when you miss study sessions
- **Smart Analytics**: Track progress with detailed insights and visualizations
- **Learning Chains**: Create custom learning paths with milestones and lessons
- **Community Features**: Share plans, compete on leaderboards, and learn together
- **Gamification**: Earn XP, unlock badges, and complete challenges
- **AI Coach**: Get personalized recommendations and motivational tips
- **Dark/Light Mode**: Beautiful theme switching with system preference detection
- **Responsive Design**: Works perfectly on all devices

## 🎨 New Color Scheme

The platform now features a sophisticated dark muted blues and greys palette inspired by modern design principles, providing excellent contrast and readability.

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** with custom design system
- **Shadcn/ui** components
- **React Router** for navigation
- **React Query** for data fetching
- **Framer Motion** for animations

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation
- **Helmet** for security
- **Rate Limiting** for API protection

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd pathmind-ai-main
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

### 3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp env.example .env

# Update .env with your configuration
# MONGODB_URI=mongodb://localhost:27017/consistai
# JWT_SECRET=your-super-secret-key

# Start development server
npm run dev
```

### 4. Database Setup
```bash
# Start MongoDB (if using local)
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in backend/.env
```

## 🔧 Environment Variables

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/consistai
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=http://localhost:3000
```

## 🚀 Running the Application

### Development Mode
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd backend
npm run dev
```

### Production Build
```bash
# Frontend
npm run build

# Backend
cd backend
npm run build
npm start
```

## 📱 Available Routes

### Public Routes
- `/` - Landing page
- `/login` - User login
- `/register` - User registration

### Protected Routes (require authentication)
- `/dashboard` - Main dashboard
- `/chains` - Learning chains management
- `/today` - Today's learning tasks
- `/progress` - Progress tracking
- `/coach` - AI coach recommendations
- `/community` - Community features
- `/leaderboard` - User rankings
- `/library` - Learning resources
- `/profile` - User profile
- `/settings` - User settings

## 🔐 Authentication

The platform uses JWT-based authentication with the following features:
- Secure password hashing with bcryptjs
- JWT tokens with 7-day expiration
- Protected routes with middleware
- Automatic token refresh
- Secure logout functionality

## 🎨 Theme System

The platform includes a sophisticated theme system:
- **Light Mode**: Clean, bright interface
- **Dark Mode**: Easy on the eyes
- **Auto Mode**: Follows system preferences
- Persistent theme selection
- Smooth transitions between themes

## 📊 Database Models

### User
- Profile information (name, email, username)
- Learning statistics (streaks, XP, level)
- Preferences and settings
- Badges and achievements

### LearningChain
- Custom learning paths
- Milestones and lessons
- Progress tracking
- Analytics and insights

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Render/Heroku)
```bash
# Set environment variables
# Deploy with Node.js buildpack
```

## 🔒 Security Features

- **Helmet.js** for security headers
- **Rate limiting** to prevent abuse
- **Input validation** with express-validator
- **Password hashing** with bcryptjs
- **JWT token** authentication
- **CORS** configuration
- **Environment variable** protection

## 📈 Performance Features

- **Compression** middleware
- **Database indexing** for fast queries
- **Efficient queries** with Mongoose
- **Optimized builds** with Vite
- **Lazy loading** for components
- **Image optimization** support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

## 🎯 Roadmap

- [ ] Mobile app development
- [ ] Advanced AI features
- [ ] Social learning features
- [ ] Integration with learning platforms
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

---

**Built with ❤️ for the learning community**
