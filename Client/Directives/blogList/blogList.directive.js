/**
 * Created by mac on 16/1/4.
 */

'use strict';

angular.module("ionicApp").directive("blogList",function(){
    return {
        templateUrl:'Directives/blogList/blogList.html',
        restrict:'EA',
        scope:{
            blogData:"=",
            showDel:"@",
            showIgnore:"@",
            showFocus:"@"
        },
        link:function($scope,element,attrs){},
        controller:function($scope,dataTool,$http,$state,jsCore){

            var user = dataTool.getUser();

            $scope.showDel == undefined?$scope.showDel=false:$scope.showDel=true;
            $scope.showIgnore == undefined?$scope.showIgnore=false:$scope.showIgnore=true;
            $scope.showFocus == undefined?$scope.showFocus=false:$scope.showFocus=true;

            $scope.goDetail = function(item){
                $state.go("blogdetail",{entity:item,id:item._id});
            }

            $scope.ignoreItem = function(item){
                updateMyArticleStates("ignore",item);
            }

            $scope.focusItem = function(item){
                updateMyArticleStates("focus",item);
            }

            $scope.unFocusItem = function(item){
                updateMyArticleStates("unIgnore",item);
            }

            function updateMyArticleStates(tag,item){

                if(user){
                    if(tag == "ignore"){
                        $http.post('/api/users/ignoreBlog',{ids:[item._id],name:user.name}).success(function(d){
                            if(d.rc){
                                jsCore.showAlert("忽略","忽略成功!");
                            }
                        })
                    }
                    if(tag == "focus"){
                        $http.post('/api/users/focusBlog',{ids:[item._id],name:user.name}).success(function(d){
                            if(d.rc){
                                jsCore.showAlert("关注","关注成功!");
                            }
                        })
                    }
                    if(tag == "unIgnore"){
                        $http.post('/api/users/unFocusBlog',{ids:[item._id],name:user.name}).success(function(d){
                            if(d.rc){
                                jsCore.showAlert("取消关注","取消关注成功!");
                            }
                        })
                    }
                }else{
                    $state.go("login",{entity:"tab.hot"});
                }


            }

            $scope.doRefresh = function(){
                var item = $scope.blogData[0];
                $scope.blogData.push(item);
            }
        }
    }
})