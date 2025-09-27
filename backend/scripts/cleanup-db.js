const mongoose = require('mongoose');
require('dotenv').config();

const cleanupDatabase = async () => {
  try {
    console.log('🔄 Starting database cleanup...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pathmind-ai', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');
    
    // Get all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    
    if (collections.length === 0) {
      console.log('📝 Database is already empty.');
    } else {
      // Drop all collections
      for (const collection of collections) {
        console.log(`🗑️  Dropping collection: ${collection.name}`);
        await mongoose.connection.db.dropCollection(collection.name);
      }
      console.log('✅ All collections dropped successfully!');
    }
    
    console.log('🚀 Your database is now clean and ready for production.');
    
  } catch (error) {
    console.error('❌ Error during database cleanup:', error);
    process.exit(1);
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('🔌 Database connection closed.');
    }
  }
};

// Run cleanup
cleanupDatabase();
