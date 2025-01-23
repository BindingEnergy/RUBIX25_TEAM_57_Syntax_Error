const { addMessage, getMessages } = require('../controllers/messageController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = require('express').Router();

router.post('/addmsg/', upload.single('file'), addMessage);
router.post('/getmsg/', getMessages);

module.exports = router;
