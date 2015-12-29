/**
 * Created by mac on 15/11/11.
 */

'use strict';

angular.module('ionicApp')
    .controller('myController', function ($scope,$stateParams,$state,$http,$rootScope,dataTool,jsCore) {

        //check user
        var user = dataTool.getUser();

        if(!user){
            $state.go("login",{entity:"tab.my"});
        }


        $scope.loginOut = function(){
            $http.post('/api/users/loginOut').success(function(d){
                if(d.rc){
                    dataTool.setUser(null);
                    $state.go("tab.hot");
                }else{
                    jsCore.showAlert("注销","注销失败!");
                }
            })
        }
    })