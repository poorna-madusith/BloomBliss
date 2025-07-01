const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB  = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors(({origin: 'http://localhost:5173', credentials:true})));
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/flowercategory',require('./routes/categoryRoutes'));
app.use('/flowers', require('./routes/flowerRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT , () => console.log(`Sever is listening on port ${PORT}`));

module.exports = app;