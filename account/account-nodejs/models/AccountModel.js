const mongoose = require('mongoose');
const AccountSchema = mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    time:{
        type: Date
    },
    account:{
        type: Number,
        required: true
    },
    type:{
        type: Number,
        default:-1
    },
    remark:{
        type: String
    },
    userId:{
        type:String,
        required:true
    }
})
const AccountModel = mongoose.model('account', AccountSchema);

module.exports = AccountModel;