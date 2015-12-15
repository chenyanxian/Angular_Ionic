/**
 * Created by mac on 15/11/11.
 */

'use strict';

angular.module('ionicApp').config(function ($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            params:{entity:null},
            templateUrl: 'Module/user/login.html',
            controller:"loginController"
        })
});
