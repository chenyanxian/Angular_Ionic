/**
 * Created by mac on 15/11/11.
 */

'use strict';

angular.module('ionicApp')
    .controller('hotController', function ($scope,$stateParams,$state,$http,dataTool) {

        $scope.hotItems = [];

        //check blog data is existed
        var blogData = dataTool.getBlogs();

        if(blogData){
            $scope.hotItems = blogData;
            console.log("data from cache");
        }
        else{
            $http.get("/api/article/getAllArticles").success(function(d){
                if(d.rc){
                    $scope.hotItems = d.data;
                    //设置数据缓存
                    dataTool.setBlogData(d.data);
                    console.log("data from server");
                }else{
                    console.log("error",d.data);
                }
            })
        }

        $scope.ignore = function(item){
            console.log(item._id," ignore");
        }

        $scope.goDetail = function(item){
            console.log(item._id," detail");

            $state.go("blogdetail",{entity:item,id:item._id});
        }

        //for(var i =0;i<5;i++){
        //    var tmp = {title:"test"+i,content:"how to design it???",code:"function a{return this;}",category:"js",creater:"abc"};
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


        //
        //
        //var user = dataTool.getUser();
        //
        //console.log(user);

    })
