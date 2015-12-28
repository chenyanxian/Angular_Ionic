/**
 * Created by mac on 15/12/28.
 */

angular.module("ionicApp").service("jsCore",function($ionicPopup){
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
    }

    return new core();
})