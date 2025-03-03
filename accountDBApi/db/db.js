module.exports = function(success, error){
    if(typeof error !== 'function'){
        error = () => {
            console.log('连接失败咯~~');
        }
    }
    const mongoose = require('mongoose');
    
    let { DBHOST, DBPORT, DBNAME } = require('../config/config');
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

    let connection = mongoose.connection;

    connection.on('open', () => { success(); });
    connection.on('error', () => { error(); });
    connection.on('close', () => {console.log('db close')});
}