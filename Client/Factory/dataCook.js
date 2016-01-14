/**
 * Created by mac on 15/12/14.
 */


angular.module("ionicApp").service("dataTool",function(){

    //key and val

    var map = {
        user:"user",
        blog:"blog",
        category:"category",
        userBlog:"userBlog"
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
        this.setAllBlogData = function(data){
            var tmp = {key:map.blog,data:JSON.stringify(data)};
            this.overWrite(map.blog,tmp);
        }

        this.getAllBlogs = function(){
            var data = getItemByKey(map.blog,this.data);
            if(data){
                return JSON.parse(data);
            }
            return data;
        }

        function getItemsFromDataByKey(ids,data,filed){
            var _tmp = ids[filed];
            var res = [];
            for(var i =0;i<_tmp.length;i++){
                for(var j=0;j<data.length;j++){
                    if(_tmp[i] == data[j]._id){
                        res.push(data[j]);
                        break;
                    }
                }
            }
            return res;
        }

        this.setUserBlogs = function(ids){

            var _d = {key:map.userBlog,data:{focus:[],ignore:[],mine:[]}};
            var allBlog = this.getAllBlogs();
            if(allBlog == null){
                return false;
            }

            _d.data.focus = getItemsFromDataByKey(ids,allBlog,"focus");
            _d.data.ignore = getItemsFromDataByKey(ids,allBlog,"ignore");
            _d.data.mine = getItemsFromDataByKey(ids,allBlog,"mine");

            this.overWrite(map.userBlog,_d);

            return true;
        }

        this.getUserBlogs = function(){
            var d = getItemByKey(map.userBlog,this.data);
            if(d == null){
                d = {focus:[],ignore:[],mine:[]};
            }
            return d;
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

        this.clearCacheData = function(){
            this.data.length = 0;
        }
    }

    return new dataTool();

})
