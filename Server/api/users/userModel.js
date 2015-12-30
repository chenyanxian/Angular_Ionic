/**
 * Created by mac on 15/12/13.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:String,
    pwd:String,
    nickname:String,
    ignore:String,
    focus:String,
    mine:String
});

module.exports = mongoose.model('User',userSchema);