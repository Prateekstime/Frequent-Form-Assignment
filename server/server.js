const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb://localhost:27017/userProfiles');

app.use('/api/users', userRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
