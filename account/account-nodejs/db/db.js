module.exports = function(success, error){
    if(typeof error !== 'function'){
        error = () => {
            console.log('Failed to connect to the database!');
        }
    }
    const mongoose =  require('mongoose');
    const { DBHOST, DBPORT, DBNAME} = require('../config/config')
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log('Database connected successfully!');
        success();
    })
    connection.on('error', () => {
        error();
    })
    connection.on('close', () => {
        console.log('Database connection closed.');
    })
}