const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

app.use('/api/auth', require('./Routes/auth.routes'));
app.use('/api/tasks', require('./Routes/task.routes'));

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
