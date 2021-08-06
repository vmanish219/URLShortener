const mongoose=require("mongoose");

const shortId=require("shortid");




module.exports=mongoose.model("ShortUrl",shortUrlSchema);