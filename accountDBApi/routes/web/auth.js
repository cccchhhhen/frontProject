const express = require('express');
const router = express.Router();
const md5 = require('md5');
const UserModel = require('../../models/UserModel')
// 注册页面
router.get('/reg', (req, res) => {
    res.render('auth/reg');
})
// 注册操作
router.post('/reg', (req, res) => {
    // console.log(req.body);
    UserModel.create({
        ...req.body,
        password: md5(req.body.password)
    })
    .then( data => {
        console.log('注册成功~~');
    })
    .catch( err => {
        console.log('注册失败~~~');
    })
    res.render('success',{msg:'注册成功', url: '/login'});
})
// 登录页面
router.get('/login', (req, res) => {
    res.render('auth/login');
})
// 登录操作
router.post('/login', (req, res) => {
    let { username, password } = req.body;
    console.log(req.body);
    UserModel.findOne({username: username, password: md5(password)})
    .then( data => {
        if(data){
            req.session.username = data.username;
            req.session._id = data._id;
            res.render('success', {msg: '登陆成功', url: '/account'});
            return;
        }else{
            res.send('账号密码错误~~');
            return ;
        }
        
    })
    .catch( err => {
        console.log(err);
    })
})

// 退出登录
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.render('success', {msg:'退出成功', url: '/login'});
    })
})
module.exports = router;