const express = require('express');
const path = require('path')
const cookieParser = require('cookie-parser');
const {connectMongodb} = require('./connections')
const URL = require('./models/url')
const {checkForAuthorization , restrictTo} = require('./middlewares/auth');
const app = express()
require("dotenv").config()

const PORT = process.env.PORT || 8001 ;
const MONG_URI = process.env.MONG_URI;

//routes
const urlRoutes = require('./routes/url');
const StaticRoute = require('./routes/StaticRoutes');
const userRoute = require('./routes/user');

connectMongodb(`${MONG_URI}`).then(()=>{
    console.log("Mongodb Connected.");
}).catch((e) => console.log(e))

app.use(express.static(path.join(__dirname+"/public")));

app.set('view engine','ejs');
app.set('views',path.resolve("./views"));

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthorization);


app.use("/" , StaticRoute);
app.use("/url", restrictTo(["NORMAL","ADMIN"]) ,urlRoutes);
app.use("/user",userRoute);

app.listen(PORT , ()=>{
    console.log(`Server Started at PORT ${PORT}`);
})
