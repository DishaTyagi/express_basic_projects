const sequelize = require('sequelize');

//creating new database
const db = new sequelize({
    dialect: 'sqlite',
    storage: 'users.db'
});

//db: users.db,  model:user
const Users = db.define('user',{
    username:{
        type: sequelize.STRING,
        unique: true,
        allowNull: false
    },

    email:{
        type: sequelize.STRING,
        unique: true,
        allowNull: true
    },
    password:{
        type: sequelize.STRING,
        allowNull: true
    },
    // fbAccessToken: {
    //     type: sequelize.STRING,
    // }
});

module.exports={
    db, Users
}