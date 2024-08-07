import {  DataTypes } from'sequelize';
import {sequelize} from "./../connection.js"
import userModel from './user.model.js';
import blogModel from './blog.model.js';

const commentModel = sequelize.define('Comment',
  {

    description:{
        type: DataTypes.TEXT,
        allowNull: false
    }

  });
userModel.hasMany(commentModel);
commentModel.belongsTo(userModel);
blogModel.hasMany(commentModel);
commentModel.belongsTo(blogModel);
export default commentModel;