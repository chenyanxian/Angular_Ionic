/**
 * Created by mac on 15/11/11.
 */

'use strict';

angular.module('ionicApp')
    .controller('hotController', function ($scope,$stateParams,$state,$http,dataTool) {

        $scope.hotItems = [];

        $http.get("/api/category/getAll").success(function(d){
            console.log(d.data);
        })

        for(var i=0;i<5;i++){
            $scope.hotItems.push({title:'这是标题_'+i,createTime:'2015_10_'+i,content:'content_'+i,creater:'创作者_'+i,category:'这是作品类型_'+i})
        }

        console.log($scope.hotItems)
        //
        //var user = userTool.getUser();
        //
        //
        //console.log(user);
    })
