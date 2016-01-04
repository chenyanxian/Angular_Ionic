'use strict';

var express = require('express');
var controller = require('./users.controller');

var router = express.Router();

router.post("/login",controller.login);
router.post("/register",controller.register);
router.get("/getAllUsers",controller.getAllUsers);
router.post('/loginOut',controller.loginOut);
router.post('/focusBlog',controller.focusBlog);
router.post('/ignoreBlog',controller.ignoreBlog);
router.post('/myBlog',controller.myBlog);
router.post('/deleteMyblog',controller.deleteMyblog);
router.post('/unFocusBlog',controller.unFocusBlog);

module.exports = router;
