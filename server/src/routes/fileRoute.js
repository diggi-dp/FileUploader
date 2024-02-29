const express = require('express');
const router = express.Router();
const multer = require('multer');
const fileController = require('../controllers/fileController');

const storage = multer.memoryStorage(); // Store file buffer in memory
const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), fileController.upload);
router.get('/list', fileController.getFiles);
router.delete('/:fileId', fileController.deleteFile);
router.post('/download/:fileId', fileController.downloadFile);

module.exports = router;
