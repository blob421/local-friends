const { sequelize, User } = require('./db.js');
require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes')
const cors = require('cors')
// Middleware
app.use(express.json());
app.use(cors());
// Mount routes
app.use('/', router);

const bcrypt = require('bcrypt');
async function main() {
  // Make sure tables exist
  await sequelize.sync();
  console.log('Database synced');
  await sequelize.authenticate();
  console.log('Database connected');

  app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

  const super_exists = await User.findOne({where: {username:'gabri'}})
  if (!super_exists){


  // Create an instance
  let password = 'password'
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({username: 'gabri', firstName: 'Gabriel', 
    lastName: 'B', password:hashedPassword});

  console.log(newUser.toJSON());

  // Query instances
  const users = await User.findAll();
  console.log(users.map(u => u.toJSON()));
    }
}
main();

