const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Author = sequelize.define('Author', {
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },      
    biography: {
        type: DataTypes.TEXT
      }      
    }
/*{
  force: true
*/)
  return Author
}
