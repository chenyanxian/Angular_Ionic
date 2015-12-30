/**
 * Created by mac on 15/12/30.
 */

'use strict';

angular.module('ionicApp').config(function($stateProvider){
    $stateProvider.state('blogdetail',{
        url:'/blogdetail/:id',
        params:{entity:null},
        templateUrl:"Module/blogdetail/blogdetail.html",
        controller:"blogdetailController"
    })
});