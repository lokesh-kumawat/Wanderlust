const User = require("../models/user")

// singnup form
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs")
}

// singup 
module.exports.singup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", 'Welcome to the wanderlust');
            res.redirect("/listings");
        });

    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }

}

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
}


module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to the Wanderlust");
    res.redirect("/listings")
}

module.exports.logout = (req, res, next) => {
   req.logout((err) => {
      if (err) {
         next(err);
      }
      req.flash("success", 'you are logged out!')
      res.redirect("/listings");
   });
}




