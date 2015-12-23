/**
 * Created by mac on 15/12/23.
 */
'use strict';

var express = require('express');
var controller = require('./category.controller');

var router = express.Router();

router.post("/add",controller.add);
router.post("/edit/:id",controller.edit);
router.get("/delete/:id",controller.delete);
router.get("/getAll",controller.getAll);

module.exports = router;