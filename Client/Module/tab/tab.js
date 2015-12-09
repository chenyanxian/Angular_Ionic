/**
 * Created by mac on 15/11/11.
 */

'use strict';

angular.module('ionicApp').config(function ($stateProvider) {
    $stateProvider
        .state('tab', {
            url: '/tab',
            templateUrl: 'Angular_ionic/Client/Module/tab/tab.html',
            controller:"tabController"
        })
        .state("tab.active",{
            url:'/active',
            views:{
                "tab-active":{
                    templateUrl:"Angular_ionic/Client/Module/active/active.html",
                    controller:"activeController"
                }
            }
        })
        .state("tab.hot",{
            url:'/hot',
            views:{
                "tab-hot":{
                    templateUrl:"Angular_ionic/Client/Module/hot/hot.html",
                    controller:"hotController"
                }
            }
        })
        .state("tab.account",{
            url:'/account',
            views:{
                "tab-account":{
                    templateUrl:"Angular_ionic/Client/Module/account/account.html",
                    controller:"accountController"
                }
            }
        })

});
