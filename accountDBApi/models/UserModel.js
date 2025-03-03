const mongoose = require('mongoose');
const db = require('../db/db');

const UserShema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
const UserModel = mongoose.model('user',UserShema);

module.exports = UserModel