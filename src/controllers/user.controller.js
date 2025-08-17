import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"

import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler( async (req,res) => {
   // get user details form req,body
   // check validation
   
// check if user already exsist: username, email
    // check for images, check for avtar
//upload them inti cloudinary, avatr
 // crate a user object - craete entry in db
 // // remove password and refresh tomen field
// check for user craetion 
// return res
   const {fullName, email, username, password}= req.body
  console.log("email:" , email);
  //if(fullName==""){
//     throw new ApiError(400,"") // we use all check consitions but code is lengthy so i am use if array check
//    }
  if(
    [
        fullName, email,username,password
    ].some((field)=> field?.trim()==="")
){
    throw new ApiError(400,"All field are required")
}

const exsistedUser=User.findOne({
    $or:[{username},{email}]
})
 if (exsistedUser) {
    throw new ApiError(409,"user with username and email alredy exsist")
 }
const avatarLocalPath= req.files?.avatar[0]?.path;
 const coverImageLocalPath=req.files?.coverImage[0]?.path;

 if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required")
 }

const avatar= await uploadOnCloudinary(avatarLocalPath)
const coverImage= await uploadOnCloudinary(coverImageLocalPath)

if(!avatar) {
    throw new ApiError (400, "Avatar file is  required")
}

 const user= await User.create({
    fullName,
    avatar:avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username:username.tolowercase
})
const creatredUser= await User.findById(user._id).select("-password - refreshToken")

if(!creatredUser){
    throw new ApiError(500, "Something went wrong while registering the user")
}

return res.status(201).json(
    new ApiResponse(200, creatredUser, "User registered Sucessfully")
)



    
})

export{registerUser}