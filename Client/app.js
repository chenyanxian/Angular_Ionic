/**
 * Created by mac on 15/11/11.
 */
'use strict';

angular.module('ionicApp',['ionic'])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider,$ionicConfigProvider) {

        //不设置views的缓存， it's very very important!
        //或者在路由处设置cache = false
        //$ionicConfigProvider.views.maxCache(0);

        $urlRouterProvider.otherwise('/tab');

        $locationProvider.html5Mode(true);

    });
