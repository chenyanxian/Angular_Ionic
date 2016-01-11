/**
 * Created by mac on 15/12/28.
 */

angular.module("ionicApp").service("jsCore",function($ionicPopup,$ionicLoading,$q,$http,dataTool,$state){
    var core = function(){

        //弹出Alert层
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

        //请求数据前的loading gif图标
        this.showLoading = function(){
            $ionicLoading.show({
                template:"<img src='../resource/images/loading.gif' />"
            })
        }

        //隐藏loading
        this.hideLoading = function(){
            $ionicLoading.hide();
        }

        //无参获取数据，方法为get，返回一个promise
        this.getDataByUrl = function(url){
            var defer = $q.defer();
            $http.get(url).success(function(d){
                defer.resolve({data:d});
            })
            return defer.promise;
        }

        this.showPopUp = function(field,title,subTitle,scope,callback){
            $ionicPopup.show({
                template:"<input type='text' ng-model='"+field+"' />",
                title:title,
                subTitle:subTitle,
                scope:scope,
                buttons:[
                    {text:'Cancel'},
                    {
                        text:'<b>Save</b>',
                        type:'button-positive',
                        onTap:function(e){
                            callback();
                        }
                    }
                ]
            })
        }

        this.checkIsLogin = function(from){
            if(!from){
                from = "tab.hot";
            }
            var user = dataTool.getUser();
            if(!user){
                $state.go("login",{entity:from});
                return null;
            }
            return user;
        }
    }

    return new core();
})