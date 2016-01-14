/**
 * Created by mac on 15/12/30.
 */

'use strict';

angular.module('ionicApp')
    .controller('blogdetailController', function($scope,$http,$state,$stateParams){

        $scope.article = null;

        $scope.id = $stateParams.id;

        if($stateParams.entity){
            $scope.article = $stateParams.entity;
        }else{
            //get item by id
            if($scope.id != ""){
                $http.get("/api/article/getArticleById/"+$scope.id).success(function(d){
                    if(d.rc){
                        $scope.article = d.data;
                    }else{
                        console.log(d.data);
                    }
                })
            }
        }
    })