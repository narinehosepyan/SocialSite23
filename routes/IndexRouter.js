const express = require('express');
const { indexView, homeInfo, profileView,changePhoto} = require('../controllers/IndexController');
const { verifyToken } = require('../middlewares/auth');
const { upload, imageResizer } = require('../middlewares/upload');
const router = express.Router();

/* GET home page. */
router.get('/', indexView);


router.get('/favicon.ico', function(req, res, next) {
  res.status(204).end();
});

router.post("/",verifyToken,homeInfo)

/* we take "ID" as parameter for
 displaying user's Profile page */

 router.get("/profile/:id",profileView);

 /*router for change photo*/
 router.post("/changePhoto",verifyToken,upload,imageResizer,changePhoto);

module.exports = router;
