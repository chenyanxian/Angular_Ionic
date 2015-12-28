/**
 * Created by mac on 15/12/9.
 */

var User = require('./userModel');

var Q = require("q");

exports.login = function(req,res){
    var name = req.body.name;
    var pwd = req.body.pwd;

    User.find({name:name,pwd:pwd},function(err,result){
        if(err || result == null || result.length == 0){
            return res.status(200).json({rc:false,data:err});
        }
        else{
            return res.status(200).json({rc:true,data:{name:result[0].name,nickname:result[0].nickname}});
        }
    })
}

exports.register = function(req,res){
    var defer = Q.defer();
    var user = new User({name:req.body.name,pwd:req.body.pwd,nickname:req.body.nickname});

    User.find({name:req.body.name},function(err,result){
        if(err){
            return res.status(200).json({rc:false,data:err});
        }else{
            if(result.length != 0){
                return res.status(200).json({rc:false,data:"该用户已经注册!"});
            }else{
                user.save(function(regerr,user){
                    if(regerr){
                        return res.status(200).json({rc:false,data:regerr});
                    }
                    else{
                        return res.status(200).json({rc:true,data:user});
                    }
                })
            }
        }
    })
}

exports.getUser = function(req,res){
    User.find({},function(err,users){
        if(err){
            return res.status(200).json({rc:false,data:err});
        }
        else{
            return res.status(200).json({rc:true,data:users});
        }
    })
}

exports.loginOut = function(req,res){
    return res.status(200).json({rc:true,data:"登出成功!!"});
}