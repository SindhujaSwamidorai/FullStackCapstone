'use strict';

const _BOOKS = require('./data_books.json');
const _AUTHORS = require('./data_authors.json');
const _GENRES = require('./data_genres.json');

module.exports = {

    insert : (Book, Author, Genre) => {

        Genre.bulkCreate(_GENRES)
        .then(() => {
            Author.bulkCreate(_AUTHORS)
            .then(() => {
                Book.bulkCreate(_BOOKS)
            })
        })
        .then (res => {
            console.log("Success adding books and authors to db");
        })
        .catch(error => {
            console.error(error);
        })

    }
}
