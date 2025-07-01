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
  const { titulo, descripcion, prioridad } = req.body;
  const [task] = await db.query('SELECT * FROM tareas WHERE tarea_id = ?', [tarea_id]);
  if (!task.length) return res.status(404).send({ message: 'Tarea no encontrada' });
  if (req.user.role !== 'admin' && task[0].user_id !== req.user.id) {
    return res.status(403).send({ message: 'No tienes permiso' });
  }
  await db.query('UPDATE tareas SET titulo = ?, descripcion = ?, prioridad=? WHERE tarea_id = ?', [titulo, descripcion, prioridad, tarea_id]);
  res.send({ message: 'Tarea actualizada' });
};

exports.updateEstado = async (req, res) => {
  const { estado } = req.body;
  const { tarea_id } = req.params;

  try {
    // Actualiza solo si la tarea es del usuario o si es admin
    const [result] = await db.query(
      req.user.role === 'admin'
        ? 'UPDATE tareas SET estado = ? WHERE tarea_id = ?'
        : 'UPDATE tareas SET estado = ? WHERE tarea_id = ? AND user_id = ?',
      req.user.role === 'admin' ? [estado, tarea_id] : [estado, tarea_id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Tarea no encontrada o sin permiso' });
    }

    res.send({ message: 'Estado actualizado correctamente' });
  } catch (error) {
    res.status(500).send({ message: 'Error al actualizar el estado' });
  }
};

exports.deleteTask = async (req, res) => {
  const { tarea_id } = req.params;

  const [task] = await db.query('SELECT * FROM tareas WHERE tarea_id = ?', [tarea_id]);

  if (!task.length) return res.status(404).send({ message: 'Tarea no encontrada' });

  if (req.user.role !== 'admin' && task[0].user_id !== req.user.id) {
    return res.status(403).send({ message: 'No tienes permiso' });
  }

  // Eliminar relaciones primero
  await db.query('DELETE FROM tarea_etiqueta WHERE tarea_id = ?', [tarea_id]);

  // Luego eliminar la tarea
  await db.query('DELETE FROM tareas WHERE tarea_id = ?', [tarea_id]);

  res.send({ message: 'Tarea eliminada' });
};