


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

   res.cookie('jwt', token, {
    httpOnly: true,
    secure: false, // set to true in production with HTTPS
    sameSite: 'lax',
    maxAge: 3600000, // 1 hour
  });
  res.redirect(`${process.env.FRONT_END_URL}/dashboard`);
});


router.get('/dashboard', authenticateToken, (req, res) => {
   
});

router.post('/register', async (req, res) => {
  const data = req.body
  const hashed = await bcrypt.hash(data.password, 10)
  const existingUser = await User.findOne({where:{username: data.username}})
  const existingEmail = await User.findOne({where:{email: data.email}})
  if (existingUser){
    return res.redirect(
   `${process.env.FRONT_END_URL}/registration?error=username_exists&username=${encodeURIComponent(
    data.username)}&email=${encodeURIComponent(data.email)}`);

  }
  if (existingEmail){
    return res.redirect(
   `${process.env.FRONT_END_URL}/registration?error=email_exists&username=${encodeURIComponent(
    data.username)}&email=${encodeURIComponent(data.email)}`);
  }

  const newUser = await User.create({username: data.username, password: hashed, 
    email:data.email})

  
  const token = jwt.sign({id: newUser.id, username: newUser.username},
    process.env.JWT_SECRET, 
    {expiresIn: '15m'}
  )
  res.cookie('jwt', token, {
    maxAge: 3600000,
    sameSite: 'lax',
    secure: false,
    httpOnly: true
  }) 
  res.redirect(`${process.env.FRONT_END_URL}/dashboard`)
})


module.exports = router;
