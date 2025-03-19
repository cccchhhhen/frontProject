const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const UserModel = require('../models/UserModel');
const md5 = require('md5');

// register route
router.post('/reg', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    const { username, password} = req.body;
    // console.log(req.body);
    // Validate username and password presence.
    if(!username || !password){
        return res.json({
            code:'1001',
            msg:'Missing required fields: username/password.',
            data: null
        })
    }
    // Store username and password
    UserModel.create({
        ...req.body,
        password: md5(req.body.password)
    })
    // success
    .then( data => {
        res.json({
            code:'0000',
            msg:'Registration successfully.',
            data: data
        })
    })
    // fail
    .catch( err => {
        res.json({
            code:'1002',
            msg:'Registration failed.',
            data: null
        })
    })
})
// login route
router.post('/login', (req, res) =>{
    res.setHeader('Access-Control-Allow-Origin','*');
    const { username, password } = req.body;
    // Username or password field is empty
    if(!username || !password){
        return res.json({
            code: '1003',
            msg: 'Username or password field is empty',
            data: null
        })
    }
    UserModel.findOne({ username: username, password: md5(password)})
    .then( data => {
        // username&password match
        if(data){
            // set token
            let token = jwt.sign({
                username: data.username,
                _id: data._id
            },'chen',{
                expiresIn: 60*60*24*7,
            })
            // console.log('user token',token);
            return res.json({
                code: '0000',
                msg: 'Login successfully',
                data: token
            })
        }
        // username/password mismatch
        res.json({
            code: '1004',
            msg: 'username/password mismatch',
            data: data
        })
    })
    // login fail
    .catch( err => {
        res.json({
            code:'1004',
            msg:'Login fail',
            data: null
        })
    })

})


module.exports = router;
