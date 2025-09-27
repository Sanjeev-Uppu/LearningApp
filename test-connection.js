const http = require('http');

console.log('🔍 Testing PathMind AI Backend Connection...');
console.log('==========================================\n');

// Test backend health endpoint
const testBackend = () => {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/health',
      method: 'GET',
      timeout: 5000
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve(response);
        } catch (error) {
          reject(new Error('Invalid JSON response'));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
};

// Run the test
testBackend()
  .then((response) => {
    console.log('✅ Backend is running successfully!');
    console.log(`📊 Status: ${response.status}`);
    console.log(`🕒 Uptime: ${response.uptime.toFixed(2)} seconds`);
    console.log(`🌍 Environment: ${response.environment}`);
    console.log('\n🎉 Your PathMind AI backend is ready!');
    console.log('\n📱 You can now:');
    console.log('1. Open http://localhost:8080 in your browser');
    console.log('2. Register a new account');
    console.log('3. Login and start using the app');
  })
  .catch((error) => {
    console.log('❌ Backend connection failed!');
    console.log(`🔍 Error: ${error.message}`);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure MongoDB is running');
    console.log('2. Check if backend is started on port 5000');
    console.log('3. Verify no firewall is blocking the connection');
    console.log('\n💡 Try running: cd backend && npm run dev');
  });
