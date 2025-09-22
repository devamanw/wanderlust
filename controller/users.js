
const User = require("../models/user.js");


module.exports.renderSignUp = (req, res) => {
    res.render("users/signup");  // views/users/signup.ejs
}

module.exports.signUp = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);

        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to WanderLust");

            // ✅ fix: use fallback
            const redirectUrl = req.session.redirectUrl || "/listings";
            delete req.session.redirectUrl; // clean up
            res.redirect(redirectUrl);
        });

    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};


module.exports.renderLoginForm =(req,res)=>{
    res.render("users/login.ejs");  // views/users/login.ejs
}

module.exports.login = async(req,res)=>{
    req.flash("success","welcome back!");
    let  redirectUrl = res.locals.redirectUrl || "/listings"; // fallback
    res.redirect(redirectUrl);
}
//destroy session and logout user
module.exports.destroy = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("Success","you have logged out successfully");
        res.redirect("/listings");
    });
}