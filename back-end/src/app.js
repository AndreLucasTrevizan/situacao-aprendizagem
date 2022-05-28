const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const logger = require('morgan');
const cors = require('cors');
const router = require('./routes/router');
const dbPool = require('./middlewares/Connection');
require('./modules/google_oauth');
require('./modules/facebook_oauth');


app.use(cors());
app.use('/api/uploads', express.static('uploads'));
app.use(logger('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(dbPool);

app.use('/api', router);

app.listen(process.env.PORT, () => {
    console.log(`Listening at port ${process.env.PORT}`);
});
