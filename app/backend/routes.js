


const express = require('express');
const bcrypt = require('bcrypt'); // for password hashing
const jwt = require('jsonwebtoken');
const { User } = require('./db');

const router = express.Router();
router.use(express.json());

const authenticateToken = require('./jwt_middleware');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });


    const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '15m' } // short-lived token
  );

  res.json({ token });
});


router.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}` });
});


module.exports = router;
