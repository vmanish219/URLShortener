const express= require("express")
const mongoose=require("mongoose");
// const ShortUrl=require("ShortUrls");
const shortid = require("shortid");
const app=express();

mongoose.connect("mongodb+srv://manish_admin:manishadmin@cluster0.lxzzo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true, useUnifiedTopology: true
})
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

const shortUrlSchema=new mongoose.Schema({
    full:{
        type:String,
        required: true
    },
    short: {
        type:String,
        required:true,
        default:shortid.generate
    },
    clicks:{
        type:Number,
        required:true,
        default:0
    }
});

const ShortUrl=mongoose.model("ShortUrl",shortUrlSchema);



app.get("/",async function(req,res){
    const shortUrls=await ShortUrl.find({});
    res.render("home",{shortUrls:shortUrls});
});

app.post("/",async function(req,res){
    url=req.body.url;
    await ShortUrl.create({
        full:url, 
    });
    res.redirect("/")
})

app.get("/:shortUrl",async function(req,res){
    const shortUrl=await ShortUrl.findOne({short:req.params.shortUrl})
    if(shortUrl==null){
        res.sendStatus(404)
    }
    else{
        shortUrl.clicks++;
        shortUrl.save();
        res.redirect(shortUrl.full);
    }
})





app.listen(process.env.PORT,function(){
console.log("server running on port 3000");
})