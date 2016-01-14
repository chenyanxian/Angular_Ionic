/**
 * Created by mac on 15/11/11.
 */

'use strict';

angular.module('ionicApp')
    .controller('myController', function ($scope,$stateParams,$state,$http,$rootScope,dataTool,jsCore) {

        //check user
        var user = jsCore.checkIsLogin("tab.my");
        if(!user) return;

        $scope.items = [
            {index:1,name:"我的Article",show:true},
            {index:2,name:"我关注的Article",show:true},
            {index:3,name:"忽略的Article",show:true},
            {index:4,name:"清理缓存数据",show:false}]

        $scope.user = user;

        $scope.changeNickName = function(name){
            jsCore.showPopUp("user.nickname","update your nickName","",$scope,function(d){
                console.log($scope.user.nickname);

                $http.post("/api/users/updateNickName",{name:user.name,nickName:user.nickname}).success(function(d){
                    if(d.rc){
                        jsCore.showAlert("编辑","修改NickName成功!");
                    }
                })
            })
        }

        $scope.goList = function(item){
            if(item.index == "1"){
                $state.go("blogist",{entity:null,types:config.ArticleType["mine"],title:"我的Article"});
            }
            if(item.index == "2"){
                $state.go("blogist",{entity:null,types:config.ArticleType["focus"],title:"我关注的Article"});
            }
            if(item.index == "3"){
                $state.go("blogist",{entity:null,types:config.ArticleType["ignore"],title:"我忽略的Article"});
            }
            if(item.index == "4"){
                jsCore.showAlert("清除缓存","清除缓存成功,请重新登录!",function(){
                    dataTool.clearCacheData();
                    $state.go("login");
                })
            }
        }

        $scope.loginOut = function(){
            $http.post('/api/users/loginOut').success(function(d){
                if(d.rc){
                    dataTool.setUser(null);
                    $state.go("tab.hot");
                }else{
                    jsCore.showAlert("注销","注销失败!");
                }
            })
        }
    })

angular.module("ionicApp").controller("blogListController",function($scope,$stateParams,$state,$http,$rootScope,dataTool,jsCore){

    var user = jsCore.checkIsLogin("tab.my");
    if(!user) return;

    $scope.focus = {show:false};
    $scope.unfocus = {show:false};
    $scope.ignore = {show:false};

    $scope.title = $state.params.title;

    $scope.blogItems = [];

    var _type = $state.params.types;
    var userBlogs = dataTool.getUserBlogs();

    if(_type== config.ArticleType["mine"]){
        $scope.blogItems = userBlogs.mine;
    }
    else if(_type == config.ArticleType["focus"]){
        $scope.blogItems = userBlogs.focus;
        $scope.focus.show = false;
        $scope.unfocus.show = true;
        $scope.ignore.show = false;
    }
    else if(_type == config.ArticleType["ignore"]){
        $scope.blogItems = userBlogs.ignore;
        $scope.focus.show = true;
        $scope.unfocus.show = false;
        $scope.ignore.show = false;
    }

    $scope.goBack = function(){
        $state.go("tab.my");
    }
})