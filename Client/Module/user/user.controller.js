/**
 * Created by mac on 15/11/11.
 */
'use strict';

angular.module('ionicApp')
    .controller('loginController', function ($scope,$stateParams,$state,$http,userTool,$ionicPopup) {

        $scope.showLogin = true;
        $scope.showRegister = false;

        var fromState = "";
        if($stateParams.entity){
            fromState = $stateParams.entity;
            $scope.showLogin = true;
        }else{
            fromState="tab.hot";
        }

        $scope.loginName = "";
        $scope.loginPwd = "";

        $scope.doLogin = function(){
            var name = $scope.loginName;
            var pwd = $scope.loginPwd;

            if(!name || !pwd){
                var confirmPopup = $ionicPopup.alert({
                    title: '登录提示',
                    template: '用户名和密码不允许为空'
                });

                confirmPopup.then(function(res){});
            }
            else{
                $http.post("/api/users/login",{name:name,pwd:pwd}).success(function(data){
                  if(data.rc){
                      //写入user tool
                      userTool.setUser(data.data);

                      $state.go(fromState);
                  }
                })
            }
        }

        $scope.doRegister = function(){

        }

        $scope.goRegister = function(){
            $scope.showLogin = false;
            $scope.showRegister = true;
        }


        $scope.goLogin = function(){
            $scope.showLogin = true;
            $scope.showRegister = false;
        }
    });