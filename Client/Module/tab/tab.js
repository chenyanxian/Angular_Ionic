/**
 * Created by mac on 15/11/11.
 */

'use strict';

angular.module('ionicApp').config(function ($stateProvider) {
    $stateProvider
        .state('tab', {
            url: '/tab',
            templateUrl: 'Module/tab/tab.html',
            controller:"tabController"
        })
        .state("tab.mblog",{
            url:'/mblog',
            cache:false,
            views:{
                "tab-mblog":{
                    templateUrl:"Module/myblog/myblog.html",
                    controller:"myblogController"
                }
            }
        })
        .state("tab.hot",{
            url:'/hot',
            cache:false,
            views:{
                "tab-hot":{
                    templateUrl:"Module/hot/hot.html",
                    controller:"hotController"
                }
            }
        })
        .state("tab.my",{
            url:'/my',
            cache:false,
            views:{
                "tab-my":{
                    templateUrl:"Module/my/my.html",
                    controller:"myController"
                }
            }
        })

});
