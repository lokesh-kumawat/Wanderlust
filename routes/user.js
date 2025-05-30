const express = require("express");
const router = express.Router();
const passport = require("passport")

const userController = require("../controllers/user")

// signup form
router.get("/signup", userController.renderSignupForm );

// when user signup they automatically logedIn
router.post("/signup", userController.singup);

// login form routes
router.get("/login", userController.renderLoginForm);

// login router
router.post("/login", passport.authenticate('local',
      {
         failureRedirect: "/login",
         failureFlash: true
      }),
   userController.login);

// logout router
router.get("/logout", userController.logout)


module.exports = router;


// only for singup 
// router.post("/signup", async (req, res) => {
//    try {
//       let { username, email, password } = req.body;
//       const newUser = new User({ email, username });
//       const registeredUser = await User.register(newUser, password);
//       console.log(registeredUser);
//       req.flash("success", 'Welcome to the wanderlust');
//       res.redirect("/listings");
//    } catch (e) {
//       req.flash("error", e.message);
//       res.redirect("/signup");
//    }

// });

