const express = require('express');
const router = express.Router();
const tagController = require('../Controllers/tag.controller');
const { verifyToken } = require('../middleware/auth.middleware');

/**
 * @swagger
 * /api/tags:
 *   post:
 *     summary: Crea una nueva etiqueta
 *     tags: [Etiquetas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object 
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Trabajo
 *     responses:
 *       200:
 *         description: Etiqueta creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Etiqueta creada
 */
router.post('/', verifyToken, tagController.createEtiqueta);

/**
 * @swagger
 * /api/tags:
 *   get:
 *     summary: Obtiene todas las etiquetas del usuario
 *     tags: [Etiquetas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de etiquetas
 */
router.get('/', verifyToken, tagController.getEtiquetas);

/**
 * @swagger
 * /api/tags/asignar:
 *   post:
 *     summary: Asigna una etiqueta a una tarea
 *     tags: [Etiquetas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tarea_id:
 *                 type: integer
 *                 example: 1
 *               etiqueta_id:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Etiqueta asignada a tarea
 */
router.post('/asignar', verifyToken, tagController.assignTagToTask);

/**
 * @swagger
 * /api/tags/tarea/{tarea_id}:
 *   get:
 *     summary: Obtiene todas las etiquetas de una tarea
 *     tags: [Etiquetas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tarea_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Lista de etiquetas de la tarea
 */
router.get('/tarea/:tarea_id', verifyToken, tagController.getTareasEtiquetas);

/**
 * @swagger
 * /api/tags/{etiqueta_id}:
 *   delete:
 *     summary: Elimina una etiqueta del usuario
 *     security:
 *       - bearerAuth: []
 *     tags: [Etiquetas]
 *     parameters:
 *       - in: path
 *         name: etiqueta_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la etiqueta
 *     responses:
 *       200:
 *         description: Etiqueta eliminada
 *       403:
 *         description: No tienes permiso o no existe
 */
router.delete('/:etiqueta_id', verifyToken, tagController.deleteEtiqueta);

module.exports = router;