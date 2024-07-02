const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Author = sequelize.define('Author', {
    author_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
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
