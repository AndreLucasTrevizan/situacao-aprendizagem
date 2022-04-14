const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({msg: 'Main route'});
});

app.listen(process.env.PORT, () => {
    console.log(`Listening at port ${process.env.PORT}`);
});
