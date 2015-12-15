/**
 * Created by mac on 15/11/11.
 */
'use strict';

angular.module('ionicApp')
    .controller('userController', function ($scope,$stateParams,$state,$http,$rootScope,userTool,$ionicPopup) {

        $scope.userName = "";
        $scope.userPwd = "";

        $scope.doLogin = function(){
            var name = $scope.userName;
            var pwd = $scope.userPwd;

            if(!name || !pwd){
                var confirmPopup = $ionicPopup.alert({
                    title: '登录提示',
                    template: '用户名和密码不允许为空'
                });

                confirmPopup.then(function(res){});
            }
            else{
                $http.post("").success(function(data){
                  if(data.rc == "0"){
                      userTool.setUser(data.data.user);
                      $state.go("");
                  }
                })
            }
        }
    })
