const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 5000;

// connect to database
mongoose.connect(process.env.ATLAS_URI)
    .then(() => {
        // listen to port after we connect to the database
        app.listen(port, () => {
            console.log(`server started on port ${port}`);
        })
    })
    .catch((err) => {
        console.error(err);
    });

const db = mongoose.connection;  
db.on('error', (err) => console.error(err));
db.once('open', () => console.log("connected to database"));

// middleware
app.use(cors());
app.use(express.json());

const exerciseRouter = require('./routes/exerciseRoutes');
const userRouter = require('./routes/userRoutes');
app.use('/api/exercise', exerciseRouter);
app.use('/api/users', userRouter);

// for production
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/build')));
//     app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html')));
// } else {
//     app.get('/', (req, res) => res.send('In development'));
// }
