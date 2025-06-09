const db = require('../config/db');

exports.createTask = async (req, res) => {
  const { titulo, descripcion, prioridad } = req.body;
  await db.query('INSERT INTO tareas (titulo, descripcion, prioridad, user_id) VALUES (?, ?, ?, ?)', [titulo, descripcion, prioridad, req.user.id]);
  res.send({ message: 'Tarea creada' });
};

exports.getTasks = async (req, res) => {
  const query = req.user.role === 'admin' ? 'SELECT * FROM tareas' : 'SELECT * FROM tareas WHERE user_id = ?';
  const [tasks] = await db.query(query, req.user.role === 'admin' ? [] : [req.user.id]);
  res.send(tasks);
};

exports.updateTask = async (req, res) => {
  const { tarea_id } = req.params;
  const { titulo, descripcion, prioridad, estado } = req.body;
  const [task] = await db.query('SELECT * FROM tareas WHERE tarea_id = ?', [tarea_id]);
  if (!task.length) return res.status(404).send({ message: 'Tarea no encontrada' });
  if (req.user.role !== 'admin' && task[0].user_id !== req.user.id) {
    return res.status(403).send({ message: 'No tienes permiso' });
  }
  await db.query('UPDATE tareas SET titulo = ?, descripcion = ?, prioridad=?, estado = ? WHERE tarea_id = ?', [titulo, descripcion, prioridad, estado, tarea_id]);
  res.send({ message: 'Tarea actualizada' });
};

exports.deleteTask = async (req, res) => {
  const { tarea_id } = req.params;
  const [task] = await db.query('SELECT * FROM tareas WHERE tarea_id = ?', [tarea_id]);
  if (!task.length) return res.status(404).send({ message: 'Tarea no encontrada' });
  if (req.user.role !== 'admin' && task[0].user_id !== req.user.id) {
    return res.status(403).send({ message: 'No tienes permiso' });
  }
  await db.query('DELETE FROM tareas WHERE tarea_id = ?', [tarea_id]);
  res.send({ message: 'Tarea eliminada' });
};