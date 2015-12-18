/**
 * Created by mac on 15/12/16.
 */


var Article = require('./articleModel');

var Q = require("q");

exports.getAllArticles = function(req,res){
    var defer = Q.defer();
    Article.find({},function(err,result){
        if(err){
            defer.reject({rc:false,data:err});
        }else{
            defer.resolve({rc:true,data:result});
        }
    })
    return defer.promise;
}

function _getArticleById(id){
    var defer = Q.defer();
    if(id == ""){
        defer.reject({rc:false,data:"参数有误,id为空."});
    }
    else{
        Article.find({_id:id},function(err,result){
            if(err){
                defer.reject({rc:false,data:err});
            }else if(result == null){
                defer.reject({rc:false,data:"对象不存在!"});
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
    return promise;
}

exports.createArticle = function(req,res){
    var defer = Q.defer();

    var title = req.body.title;
    var createTime = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
    var content = req.body.content;
    var category = req.body.category;
    var creater = req.body.creater;
    var importantCount = 0;

    if(title == "" || content == "" || category == "" || creater == ""){
        defer.reject({rc:false,data:"标题,内容,类别,创建者不允许为空!"});
    }
    else{
        var article = new Article({title:title,createTime:createTime,content:content,category:parseInt(category),creater:creater,importantCount:parseInt(importantCount)});
        article.save(function(err,result){
            if(err){
                defer.reject({rc:false,data:err});
            }
            else{
                defer.resolve({rc:true,data:result});
            }
        })
    }
    return defer.promise;
}

exports.editArticleById = function(req,res){
    var defer = Q.defer();
    var promise = _getArticleById(req.body.id);

    promise.then(function(data){
        if(data.rc == false){
            defer.resolve({rc:false,data:data.data});
        }else{
            var title = req.body.title;
            var createTime = req.body.createTime
            var content = req.body.content;
            var category = req.body.category;
            var creater = req.body.creater;
            var importantCount = req.body.importantCount;

            var article = new Article({title:title,createTime:createTime,content:content,category:parseInt(category),creater:creater,importantCount:parseInt(importantCount)});
            article.save(function(err,result){
                if(err){
                    defer.reject({rc:false,data:err});
                }
                else{
                    defer.resolve({rc:true,data:result});
                }
            })
        }
    })
    return defer.promise;
}

exports.deleteArticleById = function(req,res){
    var defer = Q.defer();
    Article.remove({_id:req.body.id},function(err){
        if(err){
          defer.reject({rc:false,data:err});
        } else{
            defer.resolve({rc:true,data:"删除成功!"});
        }
    })
    return defer.promise;
}

exports.delAllArticles = function(req,res){

}
