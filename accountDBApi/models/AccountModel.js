const mongoose = require('mongoose');
const db = require('../db/db');

const AccountShema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: Date
    },
    type: {
        type: Number,
        default: -1
    },
    account: {
        type: Number,
        required: true
    },
    remark: {
        type: String
    }
});
const AccountModel = mongoose.model('account',AccountShema);

module.exports = AccountModel