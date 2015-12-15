/**
 * Created by mac on 15/12/9.
 */

//var fs 				= require('fs');
//var urlencode 		= require('urlencode');
//var cookieParser 	= require('cookie-parser');
//var bodyParser 		= require('body-parser');
//var expressSession 	= require('express-session');


var path 			= require('path');
var express 		= require('express');
var mongoose		= require('mongoose');

var config = require('./config/config.js');
mongoose.connect(config.dbName);

//初始化端口号和环境
var port 	= process.env.PORT || 3008;
var env 	= process.env.NODE_ENV || 'development';

//setup server
var app 	= express();
var server = require('http').createServer(app);


app.set('port',port);

app.use(express.static(path.join(__dirname,'../Client')));

require('./routes')(app);

app.get('*',function(req,res){
    console.log(req.originalUrl);
    res.redirect('/#' + req.originalUrl);
})

//中间件，没有找到路由的情况下发送404
app.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 - Page not found!!!!!!');
});

//当系统错误，走500
app.use(function(req, res) {
    res.status(500);
    res.type('text/plain');
    res.send('500 - Server error!');
});

//start server
server.listen(port, function() {
    console.log('Your node server is running on '
    + app.get('env') + ' at ' + port + ' ~');
});
