'use strict';

var express = require('express');
var controller = require('./users.controller');

var router = express.Router();

router.post("/login",controller.login);
router.get("/register",controller.register);
router.get("/getUser",controller.getUser);

module.exports = router;
