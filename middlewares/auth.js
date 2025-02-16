const { getUser } = require('../services/auth');

function checkForAuthorization(req,res,next){
    const userUid = req.cookies?.uid;
    req.user = null;

    if(!userUid){
        return next();
    }

    const user = getUser(userUid);
    req.user = user;
    return next();
}

function restrictTo(roles = []){
    return function(req,res,next){
        if(!req.user)return res.redirect("/user/login");

        if(!roles.includes(req.user.role))return res.end("UnAuthorized.");
        return next();
    }
}

module.exports = {
    checkForAuthorization,
    restrictTo
};


// async function restrictToLoggedUserOnly(req, res, next) {
//     try {
//         const useruuid = req.cookies?.uid;

//         if (!useruuid) {
//             return res.redirect("/user/login");
//         }

//         const user = await getUser(useruuid);

//         if (!user) {
//             return res.redirect("/user/login");
//         }

//         req.user = user;
//         next();
//     } catch (error) {
//         console.error("Error in restrictToLoggedUserOnly middleware:", error);
//         res.status(500).send("Internal Server Error");
//     }
// }

// async function checkAuth(req,res,next){
//     const userUid = req.cookies?.uid;

//     const user = getUser(userUid);
//     req.user = user;
//     next();
// }