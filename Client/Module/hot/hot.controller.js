/**
 * Created by mac on 15/11/11.
 */

'use strict';

angular.module('ionicApp')
    .controller('hotController', function ($scope,$rootScope,$stateParams,$state,$http,dataTool,jsCore,$q) {

        $scope.hotItems = [];
        $scope.showMeTag = true;
        $scope.showAllTag = false;

        $scope.showFocus = {show:true};
        $scope.showUnFocus = {show:true};

        jsCore.showLoading();

        var blogDataPromise = null;

        //check blog data is existed
        var blogData = dataTool.getAllBlogs();

        if(blogData != null){
            $scope.hotItems = blogData;
            jsCore.hideLoading();
            console.log("blogData data from cache");
        } else{
            //这里的请求必须写在没有缓存的条件下，否则会造成多次请求
            blogDataPromise = jsCore.getDataByUrl("/api/article/getAllArticles");
            blogDataPromise.then(function(d){
                d = d.data;
                if(d.rc){
                    $scope.hotItems = d.data;
                    //设置数据缓存
                    dataTool.setAllBlogData(d.data);
                    jsCore.hideLoading();
                    console.log("blogData from server");
                }else{
                    console.log("error",d.data);
                }
            })
        }

        $scope.showMe = function(){

            var user = jsCore.checkIsLogin("tab.hot");
            if(!user) return;

            //在登录的时候已经设置了缓存数据
            var userBlog = dataTool.getUserBlogs();
            $scope.hotItems = userBlog.mine;
            console.log("userBlog data from cache");

            $rootScope.$broadcast("changeButtonState",{focus:{show:false},unfocus:{show:false}});

            $scope.showMeTag = false;
            $scope.showAllTag = true;
        }

        $scope.showAll = function(){
            $scope.hotItems = blogData;
            $scope.showMeTag = true;
            $scope.showAllTag = false;

            $rootScope.$broadcast("changeButtonState",{focus:{show:true},unfocus:{show:true}});
        }


        //for(var i = 1;i<6;i++){
        //    var tmp = {title:"CSS_temp_article"+i,smallTitle:["CSS-------"+i],content:["how to design it???"+i],code:["{margin-top:30px}"],category:"js",creater:"aaa"};
        //    $http.post("/api/article/createArticle",tmp).success(function(d){
        //
        //    })
        //}

        //var tmp = {_id:"5682406a96dc11bd2ecdc5221",title:"test__new1",content:"jjjjj",code:"function a(){return this;}",category:"js",creater:"abc",followCount:"98"};
        //$http.post("/api/article/editArticleById",{entity:tmp}).success(function(d){
        //    console.log(d);
        //})

        //var id = "5682406a96dc11bd2ecdc524";
        //$http.post("/api/article/deleteArticleById/"+id).success(function(d){
        //    console.log(d);
        //})

        //var id = ["56824467fc27504f3335b48e","56824467fc27504f3335b48f","56824467fc27504f3335b490"];
        //$http.post("/api/article/delArticlesByIds",{ids:id}).success(function(d){
        //    console.log(d);
        //})


        //$http.post("/api/article/removeAllArticles").success(function(d){
        //    console.log(d)
        //})

    })
