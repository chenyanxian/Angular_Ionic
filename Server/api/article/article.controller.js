/**
 * Created by mac on 15/12/16.
 */


var Article = require('./articleModel');

var Q = require("q");

exports.getAllArticles = function(req,res){
    var defer = Q.defer();
    Article.find({},function(err,result){
        if(err){
            return res.status(200).json({rc:false,data:err});
        }else{
            return res.status(200).json({rc:true,data:result});
        }
    })
}

function _getArticleById(id){
    var defer = Q.defer();
    if(id == ""){
        defer.resolve({rc:false,data:"参数有误,id为空."});
    }
    else{
        Article.find({_id:id},function(err,result){
            if(err){
                defer.resolve({rc:false,data:err});
            }else if(result == null){
                defer.resolve({rc:false,data:"对象不存在!"});
            }
            else{
                defer.resolve({rc:true,data:result});
            }
        })
    }
    return defer.promise;
}

exports.getArticleById = function(req,res){
    var promise = _getArticleById(req.params.id);

    promise.then(function(d){
        return res.status(200).json(d);
    });
}

exports.createArticle = function(req,res){
    var defer = Q.defer();

    var title = req.body.title;
    var createTime = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
    var content = req.body.content;
    var code = req.body.code;
    var category = req.body.category;
    var creater = req.body.creater;
    var followCount = 0;

    if(title == "" || content == "" || category == "" || creater == ""){
        return res.status(200).json({rc:false,data: "标题,内容,类别,创建者不允许为空!"});
    } else{
        var article = new Article({title:title,createTime:createTime,content:content,code:code,category:category,creater:creater,followCount:parseInt(followCount)});
        article.save(function(err,result){
            if(err){
                return res.status(200).json({rc:false,data: err});
            }
            else{
                return res.status(200).json({rc:true,data: result});
            }
        })
    }
}

exports.editArticleById = function(req,res){
    var entity = req.body.entity;
    if(entity){
        var title = entity.title;
        var createTime = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
        var content = entity.content;
        var code = entity.code;
        var category = entity.category;
        var creater = entity.creater;
        var followCount = entity.followCount;
        var tmp = {title:title,createTime:createTime,content:content,category:category,code:code,creater:creater,followCount:parseInt(followCount)};

        Article.findByIdAndUpdate({_id:entity._id},tmp,function(err,article){
            if(err){
                return res.status(200).json({rc:false,data:err});
            }else{
                return res.status(200).json({rc:true,data:article});
            }
        });
    }else{
        return res.status(200).json({rc:false,data: "参数有误!"});
    }
}

exports.deleteArticleById = function(req,res){
    var id = req.params.id;
    if(id){
        Article.remove({_id:id},function(err){
            if(err){
                return res.status(200).json({rc:false,data: err});
            } else{
                return res.status(200).json({rc:true,data: "删除成功!"});
            }
        })
    }else{
        return res.status(200).json({rc:false,data: "参数有误!"});
    }
}

exports.delArticlesByIds = function(req,res){
    var ids = req.body.ids;
    console.log(ids);
    Article.remove({_id:{$in:ids}},function(err){
        if(err){
            return res.status(200).json({rc:false,data: err});
        } else{
            return res.status(200).json({rc:true,data: "批量删除成功!"});
        }
    })
}

exports.removeAllArticles = function(req,res){
    Article.remove({},function(err){
        if(err){
            return res.status(200).json({rc:false,data: err});
        } else{
            return res.status(200).json({rc:true,data: "全部删除成功!"});
        }
    })
}
