/**
 * Created by mac on 15/11/11.
 */

'use strict';

angular.module('ionicApp')
    .controller('hotController', function ($scope,$stateParams,$state,$http,dataTool) {

        $scope.hotItems = [];

        $http.get("/api/article/getAllArticles").success(function(d){
            //console.log(d.data);
        })


        //for(var i =0;i<5;i++){
        //    var tmp = {title:"test"+i,content:"jjjjj",category:"js",creater:"abc"};
        //    $http.post("/api/article/createArticle",tmp).success(function(d){
        //        console.log(d.data._id);
        //    })
        //}

        //var tmp = {_id:"5682406a96dc11bd2ecdc5221",title:"test__new1",content:"jjjjj",category:"js",creater:"abc",importantCount:"98"};
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
        //for(var i=0;i<5;i++){
        //    $scope.hotItems.push({title:'这是标题_'+i,createTime:'2015_10_'+i,content:'content_'+i,creater:'创作者_'+i,category:'这是作品类型_'+i})
        //}
        //
        //
        //var user = dataTool.getUser();
        //
        //console.log(user);

    })
