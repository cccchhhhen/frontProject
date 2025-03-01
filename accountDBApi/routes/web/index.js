const express = require('express');
const router = express.Router();
const AccountModel = require('../../models/AccountModel');
const database = require('../../db/db')

// database(() => {
  console.log('连接成功咯~~~~');
  router.get('/account', function(req, res, next) {
    // 数据库获取数据
    AccountModel.find().then( (result, err) => {
      console.log(result);
      res.render('index',{result});
    });
  });

  router.get('/account/create', function(req, res, next) {
    res.render('create');
  })

  router.post('/account', function (req, res, next){
    // 数据库存储数据
    AccountModel.create({ ...req.body}).then(result => {console.log(result)});
    res.render('success',{msg: '添加成功哦~~', url: '/account'});
  })

  // 删除记录
  router.get('/account/:id', (req, res) => {
    let id = req.params.id;
    AccountModel.deleteOne({_id:id}).then(result => console.log(result));
    // 提醒
    res.render('success',{msg: '删除成功~~', url:'/account'})
  })

// });
module.exports = router;
