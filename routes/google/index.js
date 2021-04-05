const passport = require("passport");
const router = require("express").Router();
const axios = require('axios')

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
    res.writeHead(302, {Location: "https://sheltered-plateau-62064.herokuapp.com/journals"});//!!!!!!! change to heroku
    res.end();
  });

module.exports = router;