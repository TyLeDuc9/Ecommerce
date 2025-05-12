const cloudinary = require('cloudinary').v2; 
const { ConnectCloudinary } = require('../config/cloudinary'); 
require('dotenv').config(); 

exports.ConnectCloudinary=async()=>{
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    
}