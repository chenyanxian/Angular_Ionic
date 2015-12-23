/**
 * Created by mac on 15/11/11.
 */

'use strict';

angular.module('ionicApp')
    .controller('hotController', function ($scope,$stateParams,$state,$http,userTool) {

        $scope.hotItems = [];

        //$http.get("/api/article/getAllArticles/").success(function(d){
        //
        //})
        //左侧上   title   右  类别   左侧下   创建人   右侧下  时间

        for(var i=0;i<5;i++){
            $scope.hotItems.push({title:'这是标题_'+i,createTime:'2015_10_'+i,content:'content_'+i,creater:'创作者_'+i,category:'这是作品类型_'+i})
        }

        console.log($scope.hotItems)

        var user = userTool.getUser();


        console.log(user);
    })
