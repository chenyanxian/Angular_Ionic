/**
 * Created by mac on 15/11/11.
 */

'use strict';

angular.module('ionicApp')
    .controller('hotController', function ($scope,$stateParams,$state,$http,$rootScope) {

        $scope.hotItems = [];

        $http.get("/api/users/getuser").success(function(d){
            if(d.rc){
                $scope.hotItems = d.data;
            }
        })

    })
