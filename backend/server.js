const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB  = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/flowers',require('./routes/categoryRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT , () => console.log(`Sever is listening on port ${PORT}`));

module.exports = app;