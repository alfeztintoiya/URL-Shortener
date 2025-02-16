const express = require('express')
const URL = require('../models/url');
const { restrictTo } = require('../middlewares/auth');
const router = express.Router();

router.get("/",(req,res)=>{
    return res.render("homepage");
})

router.get("/admin/urls", restrictTo(['ADMIN']) ,async(req,res)=>{
    if(!req.user) return res.redirect("/user/login");

    const allUrls = await URL.find({ });
    return res.render("home",{
        urls: allUrls 
    });
})

router.get("/home",async (req,res)=>{
    if(!req.user) return res.redirect("/user/login");

    const allUrls = await URL.find({ createdBy: req.user._id});
    return res.render("home",{
        urls: allUrls 
    });
})

router.get("/signup",(req,res)=>{
    return res.render("signup");
})

router.get("/user/login",(req,res)=>{
    return res.render("login");
});

module.exports = router;