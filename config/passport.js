const passport = require('passport');
const G_Strategy = require('passport-google-oauth2').Strategy; // it's in passport library

// From the user take just the id (to minimize the cookie size)
// and just pass the id of the user to the done callback function
passport.serializeUser(function(user, done) {
  done(null, user);
});

// not the user this function usually recives the id ,
// then you use this id in selecting the user from the db and pass the user (obj) to the  callback function(done)
passport.deserializeUser(function(user, done) {
  done(null, user); 
});

// WARNING: DO NOT UNCOMMENT UNLESS YOUR DEBUGGING LOCALLY ON DEV ENVIRONMENT.
// We DO NOT want these keys exposed in our server logs.
//  console.log(process.env.G_CLIENT_ID) ;
//  console.log(process.env.G_CLIENT_SECRET) ;
//  console.log(process.env.G_CALLBACK_URL) ;

passport.use(new G_Strategy({
    clientID:process.env.G_CLIENT_ID,
    clientSecret:process.env.G_CLIENT_SECRET,
    callbackURL:process.env.G_CALLBACK_URL,
    passReqToCallback:true
  },
  function(request, accessToken, refreshToken, profile, done) {

    // refreshToken after authentication, (done) is call back function
    console.log(profile) // from document

    // profile is object, in which we see different kind of information[dipalyname,email,profilepic]
    return done(null, profile);
  }
));

 