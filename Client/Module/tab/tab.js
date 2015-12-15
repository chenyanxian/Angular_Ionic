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
        .state("tab.active",{
            url:'/active',
            views:{
                "tab-active":{
                    templateUrl:"Module/active/active.html",
                    controller:"activeController"
                }
            }
        })
        .state("tab.hot",{
            url:'/hot',
            views:{
                "tab-hot":{
                    templateUrl:"Module/hot/hot.html",
                    controller:"hotController"
                }
            }
        })
        .state("tab.account",{
            url:'/account',
            views:{
                "tab-account":{
                    templateUrl:"Module/account/account.html",
                    controller:"accountController"
                }
            }
        })

});
