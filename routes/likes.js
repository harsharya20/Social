const express =require('express');
const router=express.Router();
const LikesController = require('../controller/likes_controllers');

router.post('/toggle', LikesController.toggleLike);

module.exports = router;
