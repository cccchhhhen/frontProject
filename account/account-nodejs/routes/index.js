const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const AccountModel = require('../models/AccountModel');

let checkTokenMiddleWare = (req, res, next) => {
  // check token 
  let token = req.get('token');
  // empty token
  if(!token){
    console.log('token 为空');
    return res.json({
      code: '2002',
      msg: 'token is empty',
      data: null
    })
  }
  console.log(token);
  // verify token
  jwt.verify(token,'chen',(err, data) => {
    if(err){
      console.log('token校验失败',err);
      return res.json({
        code: '2003',
        msg: 'token 检验失败',
        data: null
      })
    }
    req.userId = data._id;
    console.log('token校验成功');
    next();
  })
}


// create account
router.post('/create-account', checkTokenMiddleWare, (req, res) => {
  // title/account is empty

  if(!req.body.title || !req.body.account){
    return res.json({
      code: '2001',
      msg: 'title/account is empty',
      data: null
    })
  }
  // title&account is not empty store
  
  
  // verify token successfully
  AccountModel.create({...req.body, userId: req.userId})
  .then( data => {
    res.json({
      code: '0000',
      msg: 'create account successfully',
      data: data
    })
  })
  .catch( err => {
    res.json({
      code: '2003',
      msg: 'fail to create account',
      data: null
    })
  })
})

// get account list
  router.get('/account-list', checkTokenMiddleWare,(req, res) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  AccountModel.find({userId:req.userId})
  .then( data => {
    res.json({
      code: '0000',
      msg: 'get account list successfully',
      data: data
    })
  })
  .catch( err => {
    console.log ('获取账单列表失败',err);
    res.json({
      code: '2004',
      msg: 'fail to get account list',
      data: null
    })
  })

})


module.exports = router;
