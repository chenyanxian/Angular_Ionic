/**
 * Created by mac on 15/12/13.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:String,//主键
    pwd:String,
    nickname:String,
    ignore:Array,
    focus:Array,
    mine:Array
});

module.exports = mongoose.model('User',userSchema);