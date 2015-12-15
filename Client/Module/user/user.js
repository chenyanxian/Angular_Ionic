/**
 * Created by mac on 15/11/11.
 */

'use strict';

angular.module('ionicApp').config(function ($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'Angular_ionic/Client/Module/user/user.html',
            controller:"userController"
        })
});
