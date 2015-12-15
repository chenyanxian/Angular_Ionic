/**
 * Created by mac on 15/12/9.
 */

var User = require('../../models/user');

var Q = require("q");

exports.login = function(req,res){
    var defer = Q.defer();

    return res.status(200).json({rc:true,data:{name:1,age:2}});
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

