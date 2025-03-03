var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const indexRouter = require('./routes/web/index');
const authRouter = require('./routes/web/auth');

var app = express();

// 导入 account 接口文件
const accountRouter = require('./routes/api/account');

// 导入 express-session
const session = require ('express-session');
const MongoStore = require('connect-mongo');
let { DBHOST, DBPORT, DBNAME } = require('./config/config');

// 设置 session 中间件
app.use(session({
  name: 'sid', //设置 cookie 的 name，默认值是：connect.sid
  secret: 'chen', // 参与加密的字符串（又称签名） 加盐
  saveUninitialized: false, // 是否为每次请求都设置一个 cookie 用来存储 session 的 id
  resave: true, // 是否在每次请求时重新保存 session
  store: MongoStore.create({
    mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`  // 数据库的连接配置
  }),
  cookie: {
    httpOnly: true, // 开启后前端无法通过 JS 操作
    maxAge: 1000 * 60 * 60 * 24 * 7 // 这一条是控制 sessionID 的过期时间的
  },
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(checkLoginMiddleware);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/api',accountRouter);
app.use('/', authRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
