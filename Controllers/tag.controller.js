const db = require('../config/db');

// Crear nueva etiqueta
exports.createEtiqueta = async (req, res) => {
    const { nombre } = req.body;
    await db.query('INSERT INTO etiquetas (nombre, user_id) VALUES ( ?, ?)', [nombre, req.user.id]);
    res.send({ message: 'Etiqueta creada' });
};

// Obtener etiquetas del usuario
exports.getEtiquetas = async (req, res) => {
    const [tags] = await db.query('SELECT * FROM etiquetas WHERE user_id = ?', [req.user.id]);
    res.send(tags);
};

// Asignar etiqueta a una tarea
exports.assignTagToTask = async (req, res) => {
    const { tarea_id, etiqueta_id } = req.body;
    await db.query('INSERT INTO tarea_etiqueta (tarea_id, etiqueta_id) VALUES (?, ?)', [tarea_id, etiqueta_id]);
    res.send({ message: 'Etiqueta asignada a tarea' });
};

// Obtener etiquetas de una tarea
exports.getTareasEtiquetas = async (req, res) => {
    const { tarea_id } = req.params;
    const [tags] = await db.query(`
    SELECT e.etiqueta_id, e.nombre
    FROM etiquetas e
    JOIN tarea_etiqueta te ON e.etiqueta_id = te.etiqueta_id
    WHERE te.tarea_id = ?
  `, [tarea_id]);
    res.send(tags);
};

// Eliminar una etiqueta
exports.deleteEtiqueta = async (req, res) => {
    const { etiqueta_id } = req.params;

    // Verificar que la etiqueta le pertenezca al usuario
    const [rows] = await db.query(
        'SELECT * FROM etiquetas WHERE etiqueta_id = ? AND user_id = ?',
        [etiqueta_id, req.user.id]
    );
    if (rows.length === 0) {
        return res.status(403).send({ message: 'No tienes permiso o no existe' });
    }

    // Eliminar relaciones con tareas primero
    await db.query('DELETE FROM tarea_etiqueta WHERE etiqueta_id = ?', [etiqueta_id]);

    // Luego eliminar la etiqueta
    await db.query('DELETE FROM etiquetas WHERE etiqueta_id = ?', [etiqueta_id]);

    res.send({ message: 'Etiqueta eliminada' });
};