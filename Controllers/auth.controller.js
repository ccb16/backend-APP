const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 8);
  await db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashed, role || 'user']);
  res.send({ message: 'Usuario registrado' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  if (!rows.length) return res.status(400).send({ message: 'Usuario no encontrado' });
  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).send({ message: 'Contraseña incorrecta' });
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.send({ token });
};