/**
 * Created by mac on 15/12/23.
 */



var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:String
});

module.exports = mongoose.model('Category', userSchema);