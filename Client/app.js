/**
 * Created by mac on 15/11/11.
 */
'use strict';

angular.module('ionicApp',['ionic'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/tab/active');

        //$locationProvider.html5Mode(true);

    });
