const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Genre = sequelize.define('Genre', {
    genre_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    genre_name: {
      type: DataTypes.STRING,
      allowNull: false
    }      
    }
/*{
  force: true
}*/)
  return Genre;
}
