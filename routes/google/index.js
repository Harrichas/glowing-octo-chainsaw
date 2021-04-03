const passport = require("passport");
const router = require("express").Router();

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
    res.redirect('/');
  });

module.exports = router;