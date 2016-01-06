/**
 * Created by mac on 15/11/11.
 */

'use strict';

angular.module('ionicApp')
    .controller('hotController', function ($scope,$stateParams,$state,$http,dataTool,jsCore,$q) {

        $scope.hotItems = [];
        jsCore.showLoading();
        var user = dataTool.getUser();

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
            if(!user){
                $state.go("login",{entity:"tab.hot"});
            }
            else{
                var userBlog = dataTool.getUserBlogs();
                if(userBlog!=null){
                    $scope.hotItems = userBlog.mine;
                    console.log("userBlog data from cache");
                }else{
                    var userBolgPromise = jsCore.getDataByUrl("/api/users/getUserBlogs/"+user.name);
                    $q.all([blogDataPromise,userBolgPromise]).then(function(d){
                        var _d = d[1].data;
                        if(_d.rc){
                            dataTool.setUserBlogs(_d.data);
                            $scope.hotItems = dataTool.getUserBlogs().mine;
                            console.log("userBlog data from cache");
                        }
                    })
                }
            }
        }


        //for(var i =0;i<1;i++){
        //    var tmp = {title:"test"+i,smallTitle:["js-------"+i],content:["how to design it???"+i],code:["function a(){return this;}"],category:"js",creater:user.name};
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
