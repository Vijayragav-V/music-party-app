const express = require('express');
const videoRoutes = require('./routes/videoRoutes');

const app = express();

app.use(express.json());  
app.use('/api', videoRoutes); 

module.exports = app;