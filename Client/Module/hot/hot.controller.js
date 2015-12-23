/**
 * Created by mac on 15/11/11.
 */

'use strict';

angular.module('ionicApp')
    .controller('hotController', function ($scope,$stateParams,$state,$http,userTool) {

        $scope.hotItems = [];

        $http.get("/api/users/getUser").success(function(d){
            $scope.hotItems = d.data;
        })

        var user = userTool.getUser();


        console.log(user);
    })
