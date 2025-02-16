const shortid = require('shortid');
const URL = require('../models/url');


async function generateShortURL(req,res){
    const body = req.body;

    if(!body.url) return res.status(400).json({ error: "url is required."});

    const shortId = shortid.generate();

    await URL.create({
        shortID: shortId,
        redirectURL : body.url,
        visitHistory: [],
        createdBy: req.user._id, 
    });

    return res.render("home",{
        id: shortId,
    })
}

async function getShortURL(req,res){
    const {shortID} = req.params;

    const entry = await URL.findOne({shortID});

    if(!entry){
        res.status(200).json("Short URL not found.");
    }

    entry.visitHistory.push({ timestamp: Date.now() });
    await entry.save();

    return res.redirect(entry.redirectURL);
}

async function getAnalytics(req,res){
    const { shortID } = req.params;

    const result = await URL.findOne({ shortID });

    return res.json({
        totalClicks: result.visitHistory.length ,
        analytics: result.visitHistory,
    });
}


module.exports = {
    generateShortURL,
    getShortURL,
    getAnalytics
}

