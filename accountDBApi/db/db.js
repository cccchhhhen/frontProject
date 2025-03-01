module.exports = function(success, error){
    if(typeof error !== 'function'){
        error = () => {
            console.log('连接失败咯~~');
        }
    }
    const mongoose = require('mongoose');

    mongoose.connect('mongodb://127.0.0.1:27017/account');

    let connection = mongoose.connection;

    connection.on('open', () => { success(); });
    connection.on('error', () => { error(); });
    connection.on('close', () => {console.log('db close')});
}