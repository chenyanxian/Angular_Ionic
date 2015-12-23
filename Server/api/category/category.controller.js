/**
 * Created by mac on 15/12/23.
 */

var Category = require('./categoryModel');

var Q = require("q");

function getItemById(name){
    var defer = Q.defer();
    Category.find({name:name},function(err,result){
        if(err){
            defer.reject({rc:false,data:err});
        }else{
            defer.resolve({rc:true,data:result});
        }
    })
    return defer.promise;
}

exports.add = function(req,res){
    var name = req.body.name;
    var category = new Category({name:name});

    var promise = getItemById(name);
    promise.then(function(result){
        if(result.rc == false){
            return res.status(200).json(result.data);
        }else{
            if(result.data.length == 0){
                category.save(function(cateerr,cate){
                    if(cateerr){
                        return res.status(200).json({rc:false,data:cateerr});
                    } else{
                        return res.status(200).json({rc:true,data:cate});
                    }
                })
            } else{
                return res.status(200).json({rc:false,data:"该类别已经存在!"});
            }
        }
    })
}

exports.edit = function(req,res){
    var id = req.body.id;
    var name = req.body.name

    Category.findByIdAndUpdate({_id:id},{name:name},function(err,cate){
        if(err){
            return res.status(200).json({rc:false,data:err});
        }else{
            return res.status(200).json({rc:true,data:cate});
        }
    });
}

exports.delete = function(req,res){
    var id = req.params.id;
    console.log(id);
    Category.remove({_id:id},function(err){
        if(err){
            return res.status(200).json({rc:false,data: err});
        } else{
            return res.status(200).json({rc:true,data: "删除成功!"});
        }
    });
}

exports.getAll = function(req,res){
    Category.find({},function(err,users){
        if(err){
            return res.status(200).json({rc:false,data:err});
        }
        else{
            return res.status(200).json({rc:true,data:users});
        }
    })
}