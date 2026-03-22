const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
connectDB()

app.get('/', (req, res) => {
  res.send("OK CON DE");
});

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));