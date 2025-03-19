const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const md5 = require('md5');
const UserModel = require('../../models/UserModel')

// 登录操作
router.post('/login', (req, res) => {
    let { username, password } = req.body;
    // console.log(req.body);
    const { secret } = require('../../config/config');
    UserModel.findOne({username: username, password: md5(password)})
    .then( data => {
        if(data){
            let token = jwt.sign({
                username:data.username,
                id: data._id
            }, secret, {
                expiresIn: 60 * 60 * 24 * 7
            });
            // 登陆成功 并 响应token
            res.json({
                code:'0000',
                msg: '登录成功',
                data: token
            });

        }else{
            res.json({
                code:'2001',
                msg: '账号或密码错误',
                data: null
            });
        }
        
    })
    .catch( err => {
        res.json({
            code:'2001',
            msg: '数据库读取失败~~',
            data: null
        });
        console.log(err);
    })
})

// 退出登录
router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.render('success', {msg:'退出成功', url: '/login'});
    })
})
module.exports = router;