const express = require('express');
const morgan = require('morgan');
require('@prisma/client');
require('dotenv').config();
const route = require('./routes/users.route');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/users', route);

app.use((req, res, next) => {
	next(createError.NotFound());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
