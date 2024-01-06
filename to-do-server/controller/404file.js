const log = require("../logger/log")

exports.File404 =(req,res,next)=>{
    log.error("path Not Found")
    res.status(404).json({
        message:"path not found",
    });
}