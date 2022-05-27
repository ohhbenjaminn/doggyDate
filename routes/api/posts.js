const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/posts');
const multer  = require('multer')
const upload = multer(); // <- handles multipart/formdata requests(photos)
// /*---------- Public Routes ----------*/
router.post('/event/:_id', postsCtrl.getEvent)
router.post('/edit/:_id', postsCtrl.updateEvent)
router.post('/search/:keyword', postsCtrl.search)
router.post('/', upload.single('photo'), postsCtrl.create);
router.delete('/delete/:_id', postsCtrl.deleteEvent);
router.get('/', postsCtrl.index)


/*---------- Protected Routes ----------*/

module.exports = router;