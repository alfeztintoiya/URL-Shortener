const {v4: uuidv4} = require('uuid');
const User = require("../models/user")
const {setUser , getUser}  = require('../services/auth')

async function UserSignup(req,res){
    const { name , email , password }  = req.body;

    await User.create({
        name,
        email,
        password
    });

    return res.redirect("home");
}

async function UserLogin(req,res){
    const {email , password } = req.body;

    const user = await User.findOne({ email, password});
    
    if(!user){
            return res.render("login",{
                err: "Invalid Username or Password",
            })
    }

    
    const token = setUser(user);
    res.cookie('uid',token);
    return res.redirect("/home");
}

module.exports = {
    UserSignup,
    UserLogin
}