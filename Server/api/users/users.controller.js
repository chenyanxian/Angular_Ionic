/**
 * Created by mac on 15/12/9.
 */

var User = require('./userModel');
var core = require('../../components/coreMethods.js');
var Q = require("q");

exports.login = function(req,res){
    var name = req.body.name;
    var pwd = req.body.pwd;

    User.find({name:name,pwd:pwd},function(err,result){
        if(err || result == null || result.length == 0){
            return res.status(200).json({rc:false,data:err});
        }
        else{
            var u = result[0];
            var tmp = {name:u.name,nickname:u.nickname,focus: u.focus,ignore: u.ignore, mine: u.mine};
            return res.status(200).json({rc:true,data:tmp});
        }
    })
}

exports.register = function(req,res){
    var user = new User({name:req.body.name,pwd:req.body.pwd,nickname:req.body.nickname,ignore:[],focus:[],mine:[]});

    var promise = core.findUserByName(req.body.name);
    promise.then(function(data){
        if(data.rc == true){
            if(data.data.length == 0){
                user.save(function(regerr,user){
                    if(regerr){
                        return res.status(200).json({rc:false,data:regerr});
                    }
                    else{
                        return res.status(200).json({rc:true,data:user});
                    }
                })
            }else{
                return res.status(200).json({rc:false,data:"该用户已经注册!"});
            }
        }else{
            return res.status(200).json({rc:false,data:data.data});
        }
    })
}

exports.getAllUsers = function(req,res){
    User.find({},function(err,users){
        if(err){
            return res.status(200).json({rc:false,data:err});
        }
        else{
            return res.status(200).json({rc:true,data:users});
        }
    })
}

exports.focusBlog = function(req,res){
    var ids = req.body.ids;
    var name = req.body.name;

    var promise = core.updateBlogStatusByName(ids,name,"focus");
    promise.then(function(d){
        return res.status(200).json({rc: d.rc,data: d.data});
    })
}

exports.ignoreBlog = function(req,res){
    var ids = req.body.ids;
    var name = req.body.name;

    var promise = core.updateBlogStatusByName(ids,name,"ignore");
    promise.then(function(d){
        return res.status(200).json({rc: d.rc,data: d.data});
    })
}

exports.unFocusBlog = function(req,res){
    var ids = req.body.ids;
    var name = req.body.name;
    var promise = core.findUserByName(name);

    promise.then(function(d){
        if(d.rc == true && d.data.length != 0){
            var _res = [];
            var focus = d.data[0].focus;

            for(var i=0;i<focus.length;i++){
                var exist = false;
                for(var j=0;j<ids.length;j++){
                    if(focus[i] == ids[j]){
                        exist = true;
                        break;
                    }
                }
                if(exist == false){
                    _res.push(focus[i]);
                }
            }

            User.findByIdAndUpdate({_id:d.data[0]._id},{focus:_res},function(err,result){
                if(err){
                    return res.status(200).json({rc:false,data:err});
                }
                else{
                    return res.status(200).json({rc:true,data:"Success!"});
                }
            })
        }else{
            return res.status(200).json({rc: false, data: d.data});
        }
    })

}

exports.myBlog = function(req,res){
    var ids = req.body.ids;
    var name = req.body.name;

    var promise = core.updateBlogStatusByName(ids,name,"mine");
    promise.then(function(d){
        return res.status(200).json({rc: d.rc,data: d.data});
    })
}

exports.deleteMyblog = function(req,res){
    var ids = req.body.ids;
    var name = req.body.name;
    var user = core.findUserByName(name);
    user.then(function(d){
        console.log(d);
        if(d.rc && d.data.length != 0){
            var res = [];
            var _mine = d.data[0].mine;
            for(var i=0;i<_mine.length;i++){
                var exist = false;
                for(var j=0;j<ids.length;j++){
                    if(_mine[i] == ids[j]){
                        exist = true;
                        break;
                    }
                }
                if(exist == false){
                    res.push(_mine[i]);
                }
            }

            User.findByIdAndUpdate({_id:d.data[0]._id},{mine:res},function(err,result){
                if(err){
                    return res.status(200).json({rc:false,data: err});
                }
                else{
                    return res.status(200).json({rc:true,data: result});
                }
            })
        }else{
            return res.status(200).json({rc:false,data: d.data});
        }
    })
}

exports.getUserBlogs = function(req,res){
    var name = req.params.name;

    var promise = core.findUserByName(name);
    promise.then(function(d){
        if(d.rc){
            if(d.data.length != 0){
                var u = d.data[0];
                res.status(200).json({rc:true,data:{focus: u.focus,ignore: u.ignore, mine: u.mine}});
            }else{
                res.status(200).json({rc:false,data: "用户异常!"});
            }
        }else{
            res.status(200).json({rc:false,data: d.data});
        }
    })

}

exports.loginOut = function(req,res){
    return res.status(200).json({rc:true,data:"登出成功!!"});
}