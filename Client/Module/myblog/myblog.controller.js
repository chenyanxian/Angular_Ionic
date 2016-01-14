/**
 * Created by mac on 15/11/11.
 */

'use strict';

angular.module('ionicApp')
    .controller('myblogController', function ($scope,$stateParams,$state,$http,dataTool,jsCore) {


        var user = jsCore.checkIsLogin("tab.mblog");
        if(!user) return;

        $scope.blogItems = [];

        var userBlogs = dataTool.getUserBlogs();
        $scope.blogItems = userBlogs.mine;

    })