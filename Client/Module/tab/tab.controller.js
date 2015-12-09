/**
 * Created by mac on 15/11/11.
 */
'use strict';

angular.module('ionicApp')
    .controller('tabController', function ($scope,$stateParams,$state,$http,$rootScope) {

        $scope.goActive = function(){
            $state.go("tab.active");
        }

        $scope.goHot = function(){
            $state.go("tab.hot");
        }
    })
