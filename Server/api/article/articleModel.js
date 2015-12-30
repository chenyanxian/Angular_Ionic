/**
 * Created by mac on 15/12/16.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    title:String,
    createTime:String,
    content:String,
    code:String,
    category:String,
    creater:String,
    followCount:Number
});

module.exports = mongoose.model('Article',userSchema);