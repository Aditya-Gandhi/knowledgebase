import {Profile} from "passport";
import {VerifyCallback} from "passport-google-oauth20";

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://localhotst:3000/auth/google/callback"
    },
    function(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
        return done(undefined, {
            profile,
            accessToken
        });
    }
));

export default passport;
