const express = require('express');
const router = express.Router();
const task = require('../controllers/task.controller');
const { verifyToken } = require('../middleware/auth.middleware');

/**
 * @swagger
 * /api/tasks/:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descripcion
 *               - prioridad
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Estudiar para el examen"
 *               descripcion:
 *                 type: string
 *                 example: "Repasar los temas del capítulo 1"
 *               prioridad:
 *                 type: string
 *                 example: "alta, media o baja"
 *     responses:
 *       200:
 *         description: Tarea creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tarea creada
 *       401:
 *         description: No autorizado
 */
router.post('/', verifyToken, task.createTask);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtener tareas del usuario o todas si es admin
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   titulo:
 *                     type: string
 *                     example: "Estudiar para el examen"
 *                   descripcion:
 *                     type: string
 *                     example: "Repasar el capítulo 1"
 *                   prioridad:
 *                     type: string
 *                     enum: [alta, media, baja]
 *                     example: "alta"
 *                   estado:
 *                     type: string
 *                     example: "pendiente"
 *                   user_id:
 *                     type: integer
 *                     example: 3
 *       401:
 *         description: No autorizado (token faltante o inválido)
 */
router.get('/', verifyToken, task.getTasks);

router.put('/:tarea_id', verifyToken, task.updateTask);

/**
 * @swagger
 * /api/tasks/{id}/estado:
 *   put:
 *     summary: Actualiza el estado de una tarea
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tarea_id
 *         required: true
 *         description: ID de la tarea
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Nuevo estado de la tarea
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [pendiente, en proceso, completado]
 *                 example: "completado"
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente
 *       404:
 *         description: Tarea no encontrada o sin permiso
 *       500:
 *         description: Error al actualizar
 */
router.put('/:tarea_id/estado', verifyToken, task.updateEstado);

router.delete('/:tarea_id', verifyToken, task.deleteTask);

module.exports = router;