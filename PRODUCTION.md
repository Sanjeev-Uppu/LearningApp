# PathMind AI - Production Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB instance (local or cloud)
- Domain name and SSL certificate
- Web server (nginx, Apache, or cloud hosting)

### 1. Database Setup
```bash
# Run database cleanup to remove all test data
cd backend
npm run cleanup-db
```

### 2. Environment Configuration

#### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://your-mongodb-uri/pathmind-ai
JWT_SECRET=your-super-secure-jwt-secret-here-minimum-32-characters
FRONTEND_URL=https://your-domain.com
```

#### Frontend (.env)
```env
VITE_API_URL=https://api.your-domain.com/api
VITE_APP_NAME=PathMind AI
VITE_APP_VERSION=1.0.0
```

### 3. Build & Deploy

#### Option A: Automated Script (Recommended)
```bash
# Windows
deploy-production.bat

# Linux/Mac
chmod +x deploy-production.sh
./deploy-production.sh
```

#### Option B: Manual Steps
```bash
# Install dependencies
npm install
cd backend && npm install && cd ..

# Build frontend
npm run build:prod

# Clean database
cd backend && npm run cleanup-db && cd ..
```

### 4. Server Deployment

#### Frontend (Static Files)
Upload the `dist/` folder to your web server:
- **Netlify**: Drag and drop `dist/` folder
- **Vercel**: Connect repository and set build command
- **Traditional hosting**: Upload to public_html/

#### Backend (Node.js)
Deploy to your preferred hosting:
- **Heroku**: Connect repository
- **DigitalOcean**: Use App Platform
- **AWS**: Use Elastic Beanstalk
- **VPS**: Use PM2 for process management

### 5. Domain & SSL Setup

#### Domain Configuration
1. Point your domain to your hosting provider
2. Set up subdomain for API (e.g., `api.yourdomain.com`)
3. Configure CORS in backend to allow your domain

#### SSL Certificate
- **Let's Encrypt**: Free SSL certificates
- **Cloudflare**: Free SSL with CDN
- **Hosting provider**: Usually included

### 6. Security Checklist

- [ ] JWT_SECRET is set and secure (32+ characters)
- [ ] MongoDB connection is secure
- [ ] CORS is properly configured
- [ ] Rate limiting is enabled
- [ ] Helmet security headers are active
- [ ] Environment variables are not in version control
- [ ] SSL certificate is installed
- [ ] Database backups are configured

### 7. Monitoring & Maintenance

#### Health Checks
- Backend: `https://api.yourdomain.com/api/health`
- Frontend: Check if app loads correctly

#### Logs
- Backend logs: Check your hosting provider's log system
- Frontend errors: Use browser dev tools or error tracking

#### Database
- Regular backups
- Monitor performance
- Check for data integrity

### 8. Testing Production

1. **Registration/Login**: Test user account creation
2. **Learning Chains**: Create and manage chains
3. **Progress Tracking**: Verify data persistence
4. **Mobile Responsiveness**: Test on different devices
5. **Performance**: Check loading times

### 9. Troubleshooting

#### Common Issues

**Backend won't start**
- Check environment variables
- Verify MongoDB connection
- Check port availability

**Frontend can't connect to API**
- Verify CORS configuration
- Check API URL in frontend
- Ensure SSL certificates are valid

**Database connection issues**
- Check MongoDB URI
- Verify network connectivity
- Check authentication credentials

### 10. Post-Deployment

#### Analytics Setup
- Google Analytics
- Error tracking (Sentry)
- Performance monitoring

#### Backup Strategy
- Database backups (daily)
- Code repository backups
- Environment configuration backups

#### Update Process
1. Test changes in development
2. Update code in production
3. Run database migrations if needed
4. Verify functionality

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review server logs
3. Test in development environment
4. Contact support team

---

**Remember**: Always test thoroughly in a staging environment before deploying to production!
