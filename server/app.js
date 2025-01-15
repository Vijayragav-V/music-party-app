const express = require('express');
const cors = require('cors');
const videoRoutes = require('./routes/videoRoutes');

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());  
app.use('/api', videoRoutes); 

module.exports = app;