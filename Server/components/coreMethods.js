/**
 * Created by mac on 15/12/9.
 */

var Q = require("q");
var User = require('../api/users/userModel.js');

var tool = function(){

    this.findUserByName =function(name){
        var defer = Q.defer();

        User.find({name:name},function(err,result){
            if(err){
                defer.resolve({rc:false,data:err});
            }else{
                defer.resolve({rc:true,data:result});
            }
        })
        return defer.promise;
    },

    this.updateBlogStatusByName = function(ids,name,field){
        var defer = Q.defer();

        var promise = this.findUserByName(name);
        promise.then(function(d){
            if(d.rc == true && d.data.length != 0){
                var data = d.data[0][field];

                for(var i = 0;i<ids.length;i++){
                    var exist = false;
                    for(var j=0;j<data.length;j++){
                        if(ids[i] == data[j]){
                            exist = true;
                            break;
                        }
                    }
                    if(exist == false){
                        data.push(ids[i]);
                    }
                }

                var _tmp = {};
                _tmp[field] = data;

                User.findByIdAndUpdate({_id:d.data[0]._id},_tmp,function(err,result){
                    if(err){
                        defer.resolve({rc:false,data:err});
                    }
                    else{
                        defer.resolve({rc:true,data:"Success!"});
                    }
                })
            }else{
                defer.resolve({rc:false,data:d.data});
            }
        })

        return defer.promise;
    },
    this.updateMyblogStatus = function(name,id){
        var defer = Q.defer();

        var promise = this.findUserByName(name);
        promise.then(function(d){

            console.log(d,name);

            if(d.rc == true && d.data.length != 0){
                d.data[0].mine.push(id);

                User.findByIdAndUpdate({_id:d.data[0]._id},{mine:d.data[0].mine},function(err,result){
                    if(err){
                        defer.resolve({rc:false,data:err});
                    }
                    else{
                        defer.resolve({rc:true,data:"Success!"});
                    }
                })
            }else{
                defer.resolve({rc:false,data:d.data});
            }
        })
        return defer.promise;
    }
}

module.exports = new tool();