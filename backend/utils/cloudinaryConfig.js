const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({
    path: './.env',
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }

        // Upload file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        });

        console.log('File uploaded on Cloudinary:', response.url);

        // Clean up local file after upload
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        console.error('Cloudinary Upload Error:', error.message);
        fs.unlinkSync(localFilePath); // Ensure local file is deleted in case of error
        return null;
    }
};

module.exports = { uploadOnCloudinary };
