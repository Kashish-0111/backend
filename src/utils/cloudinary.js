import {v2 as cloudinary} from "cloudinary"
import { error } from "console";

import fs from "fs"
cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME , 
        api_key: process.env.CLOUDINARY_CLOUD_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });
       
const uploadOnchoudinary= async (localFilePath) => {
        try {
            if(!localFilePath) return null
                //upload the file on cloudinary
             const response= await cloudinary.uploader.upload(localFilePath,{resource_type:auto})
             // file has been uploaded sucessfully
             
             console.log("file is uploaded on cloudinary", response.url);
             return error
           
        } catch (error) {
            fs.unlinkSync(localFilePath)// remove the local save fiel as the upload operation got failed 
        return null;
        }
        
    }
    export {uploadOnchoudinary}