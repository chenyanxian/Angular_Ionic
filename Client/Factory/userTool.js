/**
 * Created by mac on 15/12/14.
 */


angular.module("ionicApp").service("userTool",function(){
    var usertool = function(){

        this.user = {name:"",nickname:""};

        this.setUser = function(user){
            this.user.name = user.name;
            this.user.nickname = user.nickname;
        }

        this.getUser = function(){
            return this.user;
        }

        this.removeUser = function(uid){
            this.user = {name:"",nickname:""};
        }

        this.checkUserExist = function(){
            if(this.user.name != ""){
                return true;
            }
            else{
                return false;
            }
        }
    }

    return new usertool();

})