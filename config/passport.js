const passport = require('passport');
const G_Strategy = require('passport-google-oauth2').Strategy; // it's in passport library

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

 