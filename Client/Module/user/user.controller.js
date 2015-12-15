/**
 * Created by mac on 15/11/11.
 */
'use strict';

angular.module('ionicApp')
    .controller('loginController', function ($scope,$stateParams,$state,$http,userTool,$ionicPopup) {

        $scope.showLogin = true;
        $scope.showRegister = false;
        $scope.loginName = "";
        $scope.loginPwd = "";
        $scope.regName = "";
        $scope.regPwd = "";
        $scope.regNiceName = "";

        var fromState = "";
        if($stateParams.entity){
            fromState = $stateParams.entity;
            $scope.showLogin = true;
        }else{
            fromState="tab.hot";
        }

        $scope.doLogin = function(){
            var name = $scope.loginName;
            var pwd = $scope.loginPwd;

            if(!name || !pwd){
                var confirmPopup = $ionicPopup.alert({
                    title: '登录提示',
                    template: '用户名和密码不允许为空'
                });
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
            var name = $scope.regName;
            var pwd = $scope.regPwd;
            var nickName = $scope.regNiceName;

            if(!name || !pwd || !nickName){
                $ionicPopup.alert({
                    title: '登录提示',
                    template: '用户名,密码,昵称不允许为空!'
                });
            }
            else{
                $http.post("/api/users/register",{name:name,pwd:pwd,nickname:nickName}).success(function(data){
                    if(data.rc){
                        var confirm = $ionicPopup.alert({
                            title: '注册提示',
                            template: '注册成功'
                        });
                        confirm.then(function(){
                            $scope.showLogin = true;
                            $scope.showRegister = false;
                        })
                    }else{
                        $ionicPopup.alert({
                            title: '注册提示',
                            template: data.data
                        });
                    }
                })
            }
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