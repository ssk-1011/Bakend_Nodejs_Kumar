const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

const connectDB = require('./config/db');

const vendorRoutes = require('./routes/vendorRoutes');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();
const app = express();

// ENSURE UPLOADS FOLDER EXISTS
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// MIDDLEWARE
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// DATABASE
connectDB();

// ROUTES
app.use('/api/vendors', vendorRoutes);
app.use('/api/firms', firmRoutes);
app.use('/api/products', productRoutes);

// TEST ROUTE
app.get('/', (req, res) => {
  res.send('🚀 Foodies Backend is running successfully');
});

// SERVER
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
