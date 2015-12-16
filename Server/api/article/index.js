/**
 * Created by mac on 15/12/16.
 */


var express = require('express');
var controller = require('./article.controller');

var router = express.Router();

router.get("/getAll",controller.getAll);
router.get("/getByUid",controller.getByUid);
router.post("/create",controller.create);
router.post("/edit/:id",controller.edit);
router.post("/del/:id",controller.delete);
router.post("/del1/:id",controller.delete1);

module.exports = router;
