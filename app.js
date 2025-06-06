const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', require('./Routes/auth.routes'));
app.use('/api/tasks', require('./Routes/task.routes'));

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
