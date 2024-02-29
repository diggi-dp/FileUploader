const User = require('../models/userModel');

exports.uploadFile = async (userId, filename, fileContent,accessCode) => {
    try {
        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Add the new file to the user's files array
        user.files.push({ filename:filename, code:accessCode, url:fileContent });
        await user.save();

        return { message: 'File uploaded successfully' };
    } catch (error) {
        throw error;
    }
};

exports.getFilesForUser = async (userId) => {
    try {
        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Return the files associated with the user
        return user.files;
    } catch (error) {
        throw error;
    }
};

exports.deleteFile = async (userId, fileId) => {
    try {
        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Filter out the file to be deleted
        user.files = user.files.filter(file => file._id.toString() !== fileId);
        await user.save();

        return { message: 'File deleted successfully' };
    } catch (error) {
        throw error;
    }
};

exports.getFileById = async (userId, fileId) => {
    try {
        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Find the file by fileId within the user's files array
        const file = user.files.find(file => file._id.toString() === fileId);
        if (!file) {
            throw new Error('File not found');
        }

        return file;
    } catch (error) {
        throw error;
    }
};
