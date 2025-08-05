const express = require('express');
const app = express();

// Body parser
app.use(express.json());

// Import routes
const lemonRoutes = require('./routes/lemonRoutes');

// Use routes
app.use('/api/lemon-products', lemonRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.send('✅ API is working');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
