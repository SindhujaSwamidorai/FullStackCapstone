const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Book = sequelize.define('Book', {
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },      
    price: {
      type: DataTypes.FLOAT
    },
    publication_date: {
      type: DataTypes.DATE
    }
  }
/*{
  force: true
}*/)
  return Book
}
