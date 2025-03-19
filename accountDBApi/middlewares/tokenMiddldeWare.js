// token 中间件
const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');

module.exports = (req, res, next) => {
    // 获取 token 
    let token = req.get('token');
    // 判断
    if(!token){
      res.json({
        code:'2003',
        msg: 'token 缺失',
        data: null
      })
    }
    // 校验 token
    jwt.verify(token, secret, (err, data) => {
      if(err){
        return res.json({
          code: '2004',
          msg: 'token 校验失败',
          data: null
        });
      }
        // 保存用户信息
        // console.log('JWT 解码结果:', JSON.stringify(data, null, 2));
        console.log(data);
        // req.user = data;
        // token 校验成功
        next();
    });
    
  
  }