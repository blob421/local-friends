const { sequelize, User, Region } = require('./db.js');
require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes')
const cors = require('cors')
const cookieParser = require('cookie-parser');


// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.FRONT_END_URL, credentials: true }));


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', router);
app.use('/uploads', express.static('uploads'));

const bcrypt = require('bcrypt');
async function main() {

  await sequelize.authenticate();
  console.log('Database connected');
  // Make sure tables exist
  await sequelize.sync({alter: true});
  console.log('Database synced');
  

  app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

  const super_exists = await User.findOne({where: {username:'gabri'}})
  if (!super_exists){


  // Create an instance
  let password = 'password'
  const newRegion = await Region.create({name:'A', city: 'QC', country:'CA'})

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({username: 'gabri', firstName: 'Gabriel', 
  lastName: 'B', password:hashedPassword, email: 'gabrielbpoitras@gmail.com',
  RegionId: newRegion.id});

  

  console.log(newUser.toJSON());

  // Query instances
  const users = await User.findAll();
  console.log(users.map(u => u.toJSON()));
    }
}
main();

