const express = require('express');
const router = express.Router();
const upload=require('../utils/fileStorage')
const popular=require('../controllers/popular.controllers')

router.post("/postpopular",upload.single("image"),popular.postpopular);
router.get("/category/:category",popular.getPopularByCategory);
router.get("/section/:section",popular.getPopularBySection);
router.get("/popularid/:id",popular.getpopularById);
router.get("/all", popular.getAllPopular);



module.exports=router