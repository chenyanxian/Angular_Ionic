/**
 * Created by mac on 15/12/14.
 */


angular.module("ionicApp").service("dataTool",function(){

    //key and val

    var map = {
        user:"user",
        blog:"blog",
        category:"category"
    }

    function getItemByKey(key,data){
        var item = null;
        if(key == ""){
            return item;
        }
        for(var i=0;i<data.length;i++){
            if(key == data[i].key){
                item = data[i].data;
                break;
            }
        }
        return item;
    }

    var dataTool = function(){

        this.data = [];

        this.setUser = function(user){
            var tmp = {key:map.user,data:user};
            this.overWrite(map.user,tmp);
        }

        this.getUser = function(){
            return getItemByKey(map.user,this.data);
        }

        //保留原数据不会被污染,因此存的是字符串值类型,而不是对象引用类型
        this.setBlogData = function(data){
            var tmp = {key:map.blog,data:JSON.stringify(data)};
            this.overWrite(map.blog,tmp);
        }

        this.getBlogs = function(){
            return getItemByKey(map.blog,this.data);
        }

        this.setCategory = function(data){
            var tmp = {key:map.category,data:data};
            this.overWrite(map.category,tmp);
        }

        this.getCategory = function(){
            return getItemByKey(map.category,this.data);
        }

        this.overWrite = function(key,data){

            var res = {tag:false,data:null};

            for(var i =0;i<this.data.length;i++){
                if(this.data[i].key == key){
                    res.tag = true;
                    this.data[i] = data;
                    break;
                }
            }
            if(!res.tag){
                this.data.push(data);
            }

        }
    }

    return new dataTool();

})
