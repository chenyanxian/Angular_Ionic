/**
 * Created by mac on 15/12/16.
 */


var express = require('express');
var controller = require('./article.controller');

var router = express.Router();

router.get("/getAllArticles",controller.getAllArticles);
router.get("/getArticleById/:id",controller.getArticleById);
router.post("/createArticle",controller.createArticle);
router.post("/editArticleById",controller.editArticleById);
router.post("/deleteArticleById/:id",controller.deleteArticleById);
router.post("/delArticlesByIds",controller.delArticlesByIds);
router.post("/removeAllArticles",controller.removeAllArticles);

module.exports = router;
