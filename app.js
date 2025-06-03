
// environmet variable
if (process.env.NODE_ENV != 'productions') {
    require('dotenv').config()
}


const express = require("express");
const app = express();
const mongoose = require("mongoose")
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require('./models/user.js');


const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

let dbUrl = process.env.ATLASDB_URL;

main()
    .then((res) => {
        console.log('connected with DB');
    }).catch((err) => {
        console.log(err, "some error to connectd with database");
    });

async function main() {
    await mongoose.connect(dbUrl);
}


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));


// mongo-connect
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto : {
        secret : process.env.SECRET
    },
    touchAfter: 24 * 3600
})

store.on("error", (err) => {
    console.log('Error in MONGO SESSION STORE', err);
})

// express-session
app.use(session({
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 + 1000,
        maxAge: 7 * 24 * 60 * 60 + 1000,
        httpOnly: true
    }
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware for success and error msg
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


// ###################  listing and review, user routes ##############
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


// if the route is not find show the page is not found
app.use((req, res, next) => {
    next(new ExpressError(404, 'page not found'));
});


// error handling middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "some error occure" } = err;
    res.render("error.ejs", { err })
    // res.status(statusCode).send(message);
});


app.listen(5500, () => {
    console.log('server is running on port 5500');
});