const passport = require("passport");
const router = require("express").Router();
const isUserLoggedIn = require("../../config/middleware/isUserLoggedIn");

router.route("/")
  .get(passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

router
  .route("/callback")
  .get(passport.authenticate('google', {
    failureRedirect: '/failed'
  }), function (req, res) {
    // Successful authentication redirect back to homepage
    //res.redirect('/journals');
    // axios.get("http://localhost:3000/journals");
    res.cookie("is_logged_in", "yes");
    res.writeHead(302, {Location: `${process.env.REACT_APP_URL}/journals`});//!!!!!!! change to heroku
    res.end();
  });

router
  .route("/logout")
  .get(isUserLoggedIn, (req, res) => {
    req.logout();
    res.clearCookie("is_logged_in");
    res.writeHead(302, {Location: `${process.env.REACT_APP_URL}/`});//!!!!!!! change to heroku
    res.end();
});

module.exports = router;