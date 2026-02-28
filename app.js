

if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}


// require('dotenv').config();
// console.log(process.env.SECRETE);


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const Joi = require('joi');
const Review = require("./models/review"); // singular, no .js needed
const { listingSchema, reviewSchema } = require("./schema.js");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require('connect-flash');
const passport = require("passport");
const Localstrategy  = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");



const dbUrl = process.env.ATLASDB_URL;

main().then(() => {
    console.log("connected to DB")
}).catch(err => {
    console.log(err);
});

async function main() {
    await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join (__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
// use ejs-locals for all ejs templates:
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
// app.use(express.urlencoded({ extended: true }));
app.use("/users", userRouter);
// app.use("/users", userRouter);






const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600, // 24 hours
});



store.on("error", () => {
    console.log("ERROR in MONGO SESSION STORE", err);
});



const sessionOption = {
    store,
    secret : process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() +  7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};



app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


app.get('/', (req, res) => {
    res.render('home'); // This will render views/home.ejs
});
// app.get("/demouser",async(req,res) => {
//     let fakeUser = new User({
//     email: "student@gmail.com",
//     username: "delta-student",
    
//     });

//    let registeredUser = await User.register(fakeUser, "helloworld");
//    res.send(registeredUser);

// })
  
app.use("/listings", listingRouter);               //Access For listings file
app.use("/listings/:id/reviews", reviewsRouter);   //Use For access reviews file
app.use("/",userRouter);



// //edit route
// app.get("/listings/:id/edit", wrapAsync (async (req, res) => {
// const id = req.params.id.trim(); 
// const listing = await Listing.findById(id);
// res.render("listing/edit.ejs",{listing});
// }));


app.use((err, req, res, next) => {
    const { statusCode = 400 } = err;
    res.status(statusCode).render("listing/error", { err });
});



// //err handling middleware
// app.use((err, req, res, next) => {
//     let {statusCode, message} = err;
//     res.status(statusCode).send(message);
// })




// app.put("/chats/:id", async (req, res) => {
//   let { id } = req.params;          // extract chat id from URL
//   let { link: newLink } = req.body; // extract new link from form body

//   let updatedChat = await Chat.findByIdAndUpdate(
//     id,
//     { link: newLink },               // update only "link" field
//     { runValidators: true, new: true }
//   );

//   console.log(updatedChat);
//   res.redirect("/chats");
// });



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});