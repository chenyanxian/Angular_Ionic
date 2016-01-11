/**
 * Created by mac on 16/1/11.
 */


angular.module("ionicApp").config(function($stateProvider){
    $stateProvider.state('blogist',{
        url:'/my/blogList/:types',
        params:{entity:null,title:""},
        templateUrl:"Module/my/blogList.html",
        controller:"blogListController"
    })
})