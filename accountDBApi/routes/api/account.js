const express = require('express');
const router = express.Router();
const AccountModel = require('../../models/AccountModel');

// 记账本列表
router.get('/account', function(req, res, next) {
  // 数据库获取数据
  AccountModel.find()
  .then( result => {
    // res.render('index',{result});
  // 响应成功的提示
    res.json({
      // 响应编号
      code: '0000',
      // 响应的信息
      msg: '读取成功',
      // 响应的数据
      data: result
    });
    return;
  })
  .catch((err) => {
    // console.log('获取数据出错啦~~~');
    res.json({
      code:'1001',
      msg: '读取失败',
      data:null
    })
    // return;
  });
});

// 添加记录 响应html的  不需要 接口服务里只会响应json数据
// router.get('/account/create', function(req, res, next) {
//   res.render('create');
// })

// 新增记录
router.post('/account', function (req, res, next){
  // 此处可进行表单验证
  // 验证没个参数是否正确，即时给客户端返回消息


  // 数据库存储数据
  AccountModel.create({ ...req.body})
  .then(result => {
    // console.log(result)
    res.json({
      code: '0000',
      msg:'添加成功',
      data: result
    })
  })
  .catch((err) => {
    res.json({
      code: '1002',
      msg:'添加失败',
      data: null
    })
    // console.log('存储数据出错啦~~');
  });
  // res.render('success',{msg: '添加成功哦~~', url: '/account'});
})

// 删除记录
router.delete('/account/:id', (req, res) => {
  let id = req.params.id;
  AccountModel.deleteOne({_id:id})
  .then(() => {
    res.json({
      code:'0000',
      msg: '删除成功',
      data:{}
    });
  })
  .catch(err=>{
    res.json({
      code:'1003',
      msg: '删除失败',
      data:null
    })
  }
    
  );

})

// 获取单个账单信息
router.get('/account/:id', (req, res) => {
  let {id} = req.params;
  AccountModel.findById(id)
  .then( data => {
    res.json({
      code: '0000',
      msg: '获取单账单信息成功',
      data: data
    })
  })
  .catch(err => {
    res.json({
      code: '1004',
      msg: '获取单个账单信息失败',
      data: {}
    })
  })
})

// 更新单个账单信息
router.patch('account/:id', (req, res) => {
  let { id } = req.params;
  AccountModel.updateOne({_id: id}, req.body)
  .then( data => {
    res.json({
      code:'0000',
      msg: '更新成功',
      data: data
    })
  })
  .catch( err => {
    res.json({
      code:'1005',
      msg: '更新失败',
      data: null
    })
  })
})
module.exports = router;
