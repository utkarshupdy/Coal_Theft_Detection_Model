const asyncHandler = (requestHandler)=>{
    return(req , res , next)=>{
        Promise.resolve(requestHandler(req , res , next)).catch((err)=>next(err))
    }
} // this is another method by using promises ............



export {asyncHandler}