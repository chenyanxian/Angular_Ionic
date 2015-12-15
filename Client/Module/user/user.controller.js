/**
 * Created by mac on 15/11/11.
 */
'use strict';

angular.module('ionicApp')
    .controller('loginController', function ($scope,$stateParams,$state,$http,userTool,$ionicPopup) {

        var fromState = "";
        if($stateParams.entity){
            fromState = $stateParams.entity;
        }else{
            fromState="tab.hot";
        }

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
                $http.post("/api/users/login",{name:name,pwd:pwd}).success(function(data){
                  if(data.rc){
                      //写入user tool
                      userTool.setUser(data.data);

                      $state.go(fromState);
                  }
                })
            }
        }
    });

angular.module('ionicApp')
    .controller('registerController',function($scope,$stateParams,$state,$http,userTool,$ionicPopup){

    })
