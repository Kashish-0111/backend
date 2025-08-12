const asyncHandler=(requestHandler)=>{
      (req,res,next)=>{
        Promise.reslove(requestHandler(req, res, next))
        .catch((err)=> next(err))
      }
}

export {asyncHandler}

//using asyn try cath arrow function


// const asyncHandler=()=>{}
    //higher order function
// const asyncHandler=(fn)=>{()=>{}}
// const asyncHandler=(fn)=> async()=>{}


// const asyncHandler=(fn)=> async (res,req,next)=>{
//     try {
//        await fn(req,res,next) 
//     } catch (error) {
//         res.status(error.code|| 500).json({
//             success:false,
//             message:error.message
//         })
        
//     }

// }

