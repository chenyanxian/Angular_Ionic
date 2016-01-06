/**
 * Created by mac on 15/11/11.
 */
'use strict';

angular.module('ionicApp')
    .controller('loginController', function ($scope,$stateParams,$state,$http,dataTool,$ionicPopup,jsCore) {

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
                jsCore.showAlert("登录提示","用户名和密码不允许为空");
            }
            else{
                $http.post("/api/users/login",{name:name,pwd:pwd}).success(function(data){
                  if(data.rc){
                      //写入data cache
                      dataTool.setUser(data.data);

                      //设置用户blog信息
                      var bl = dataTool.setUserBlogs(data.data);
                      if(bl==false){
                          var blogDataPromise = jsCore.getDataByUrl("/api/article/getAllArticles");
                          blogDataPromise.then(function(d){
                              d = d.data;
                              if(d.rc){
                                  dataTool.setAllBlogData(d.data);
                                  dataTool.setUserBlogs(data.data);
                              }else{
                                  console.log("error",d.data);
                              }
                          })
                      }
                      $state.go(fromState);
                  }else{
                      jsCore.showAlert("登录提示","用户名或密码错误!");
                  }
                })
            }
        }

        $scope.doRegister = function(){
            var name = $scope.regName;
            var pwd = $scope.regPwd;
            var nickName = $scope.regNiceName;

            if(!name || !pwd || !nickName){
                jsCore.showAlert("登录提示","用户名和密码,昵称不允许为空");
            }
            else{
                $http.post("/api/users/register",{name:name,pwd:pwd,nickname:nickName}).success(function(data){
                    if(data.rc){
                        jsCore.showAlert("注册提示","注册成功",function(){
                            $scope.showLogin = true;
                            $scope.showRegister = false;
                            $scope.loginName = name;
                            $scope.loginPwd = pwd;
                        })
                    }else{
                        jsCore.showAlert("注册提示",data.data);
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

        $scope.goHot = function(){
            $state.go("tab.hot");
        }
    });