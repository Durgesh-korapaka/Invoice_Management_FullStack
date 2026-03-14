const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./db');

const app = express();

connectDB();

// middleware
app.use(cors()); // for accept frontend requests
app.use(express.json()); // for parsing application/json

// routes
app.use('/api/invoices', require('./routes/invoices'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});