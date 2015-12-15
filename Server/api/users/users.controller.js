/**
 * Created by mac on 15/12/9.
 */

var User = require('./userModel');

var Q = require("q");

exports.login = function(req,res){
    var defer = Q.defer();
    var name = req.body.name;
    var pwd = req.body.pwd;

    User.find({name:name,pwd:pwd},function(err,result){
        console.log(result);
        if(err || result == null || result.length == 0){
            return res.status(200).json({rc:false,data:"没有找到该用户!"});
        }
        else{
            return res.status(200).json({rc:true,data:{name:result[0].name,nickname:result[0].nickname}});
        }
    })
}

exports.register = function(req,res){
    var defer = Q.defer();
    var user = new User(req.query);

    user.save(function(err,user){
        if(err){
            return res.status(500).json({rc:false,data:"服务器异常!"});
        }
        else{
            return res.status(200).json({rc:true,data:user});
        }
    })
}

exports.getUser = function(req,res){
    var defer = Q.defer();

    User.find({},function(err,users){
        if(err){
            return res.status(500).json({rc:false,data:"服务器异常!"});
        }
        else{
            return res.status(200).json({rc:true,data:users});
        }
    })
}
