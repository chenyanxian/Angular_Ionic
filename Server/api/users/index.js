'use strict';

var express = require('express');
var controller = require('./users.controller');

var router = express.Router();

router.post("/login",controller.login);
router.post("/register",controller.register);
router.get("/getUser",controller.getUser);
router.post('/loginOut',controller.loginOut);

module.exports = router;
