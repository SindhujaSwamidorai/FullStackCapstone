const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Genre = sequelize.define('Genre', {
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    genre_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }      
    }
/*{
  force: true
}*/)
  return Genre;
}
