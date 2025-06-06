const db = require('../config/db');

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  await db.query('INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)', [title, description, req.user.id]);
  res.send({ message: 'Tarea creada' });
};

exports.getTasks = async (req, res) => {
  const query = req.user.role === 'admin' ? 'SELECT * FROM tasks' : 'SELECT * FROM tasks WHERE user_id = ?';
  const [tasks] = await db.query(query, req.user.role === 'admin' ? [] : [req.user.id]);
  res.send(tasks);
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const [task] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
  if (!task.length) return res.status(404).send({ message: 'Tarea no encontrada' });
  if (req.user.role !== 'admin' && task[0].user_id !== req.user.id) {
    return res.status(403).send({ message: 'No tienes permiso' });
  }
  await db.query('UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?', [title, description, status, id]);
  res.send({ message: 'Tarea actualizada' });
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const [task] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
  if (!task.length) return res.status(404).send({ message: 'Tarea no encontrada' });
  if (req.user.role !== 'admin' && task[0].user_id !== req.user.id) {
    return res.status(403).send({ message: 'No tienes permiso' });
  }
  await db.query('DELETE FROM tasks WHERE id = ?', [id]);
  res.send({ message: 'Tarea eliminada' });
};