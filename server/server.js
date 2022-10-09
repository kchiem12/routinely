const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());

const exerciseRoutes = require('./routes/exercises.js');

app.use('/api/exercise', exerciseRoutes);

// connect to database
mongoose.connect(process.env.ATLAS_URI)
    .then(() => {
        // listen to port after we connect to the database
        app.listen(port, () => {
            console.log(`Server is running at port ${port}`);
        })
    })
    .catch((err) => {
        console.error(err);
    });