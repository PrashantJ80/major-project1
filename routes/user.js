const express = require("express");
const router = express.Router();  
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const session = require("express-session");
const flash = require('connect-flash');
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");


// Use router.route(/path)....not defined path every time.
router
.route("/signup")
.get( userController.rendersignupform)
.post(wrapAsync
    (userController.signup));


router
.route("/login")
.get(userController.renderloginForm)
.post( 
    saveRedirectUrl,
    passport.authenticate("local", {  //use passport.authinticate is middleware use to match username and id 
        failureRedirect: "/login",  //use passport library
       failureFlash: true,   
    }),
    userController.login),


router.get("/logout", userController.renderlogoutform);
module.exports = router;

