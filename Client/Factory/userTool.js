/**
 * Created by mac on 15/12/14.
 */


angular.module("ionicApp").service("userTool",function(){
    var usertool = function(){

        this.userName = "";

        this.setUser = function(uid){
            this.userName = uid;
        }

        this.removeUser = function(uid){
            this.userName = "";
        }

        this.checkUserExist = function(){
            if(this.userName != ""){
                return true;
            }
            else{
                return false;
            }
        }
    }

    return new usertool();
})