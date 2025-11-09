const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:1246@localhost:5432/js-backend')

class User extends Model {}

User.init(
  {
    firstName: {type: DataTypes.STRING},
    lastName: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, allowNull: false},
    username: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    found: {type: DataTypes.INTEGER},
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
  },
);



// the defined model is the class itself
console.log(User === sequelize.models.User); // true

module.exports = { sequelize, User };