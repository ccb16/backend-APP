const express = require('express');
const router = express.Router();
const task = require('../controllers/task.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.post('/', verifyToken, task.createTask);
router.get('/', verifyToken, task.getTasks);
router.put('/:id', verifyToken, task.updateTask);
router.delete('/:id', verifyToken, task.deleteTask);

module.exports = router;