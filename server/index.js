const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(express.json());
// cors allows for cross platform usage between front end and back end
app.use(cors());


