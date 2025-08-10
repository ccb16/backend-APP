const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', require('./Routes/auth.routes'));
app.use('/api/tasks', require('./Routes/task.routes'));
app.use('/api/tags', require('./Routes/tag.routes'));

module.exports = app;
