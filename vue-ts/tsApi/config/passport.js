const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {

            const user = await User.findOne({name:jwt_payload.name})
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }

        })
        
    );
};