/**
 * Created by mac on 15/11/11.
 */

'use strict';

angular.module('ionicApp')
    .controller('accountController', function ($scope,$stateParams,$state,$http,$rootScope,userTool) {

        //check user
        var bl = userTool.checkUserExist();

        if(!bl){
            $state.go("login",{entity:"tab.account"});
        }
    })