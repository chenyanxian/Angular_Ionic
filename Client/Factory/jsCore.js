/**
 * Created by mac on 15/12/28.
 */

angular.module("ionicApp").service("jsCore",function($ionicPopup,$ionicLoading,$q,$http){
    var core = function(){
        this.showAlert = function(title,description,callback){
            var confirm = $ionicPopup.alert({
                title: title,
                template: description
            });
            if(callback){
                confirm.then(function(){
                    callback();
                })
            }
        }

        this.showLoading = function(){
            $ionicLoading.show({
                template:"<img src='../resource/images/loading.gif' />"
            })
        }

        this.hideLoading = function(){
            $ionicLoading.hide();
        }

        this.getDataByUrl = function(url){
            var defer = $q.defer();
            $http.get(url).success(function(d){
                defer.resolve({data:d});
            })
            return defer.promise;
        }
    }

    return new core();
})