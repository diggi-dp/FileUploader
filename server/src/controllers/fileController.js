const fileService = require('../services/fileService');
const { getUserIdFromToken, generateUniqueCode } = require('../utils/common')

exports.upload = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const userId = await getUserIdFromToken(token)
    try {
        const { originalname } = req.file;
        const fileContent = req.file.buffer.toString('base64');
        const accessCode = generateUniqueCode()
        const file = await fileService.uploadFile(userId, originalname, fileContent, accessCode);
        res.status(200).json(file);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading file' });
    }
};

exports.getFiles = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const userId = await getUserIdFromToken(token)
    try {
        const files = await fileService.getFilesForUser(userId);
        res.status(200).json(files);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching files' });
    }
};

exports.deleteFile = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const userId = await getUserIdFromToken(token)
    try {
        const response = await fileService.deleteFile(userId, req.params.fileId);
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting file' });
    }
};

exports.downloadFile = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const userId = await getUserIdFromToken(token)

    const { accessCode } = req.body;

    if (!accessCode) {
        return res.status(400).json({ message: 'Access code is required and must be a number' });
    }

    try {
        const file = await fileService.getFileById(userId, req.params.fileId);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        console.log({'accessCode':accessCode,'ac':file.code})
        // Check if the access code matches the file's code
        if (accessCode != file.code) {
            return res.status(403).json({ message: 'Access code is incorrect' });
        }

        // Set content disposition header to prompt download
        res.setHeader('Content-Disposition', `attachment; filename="${file.filename}"`);

        // Convert base64 string to buffer and send as response
        const fileBuffer = Buffer.from(file.url, 'base64');
        res.send(fileBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error downloading file' });
    }
};