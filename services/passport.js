const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const { secret } = require('../config/main')
const { Users } = require('../routes/users/models')

module.exports = (passport) => {
	const opts = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('token'),
		secretOrKey: secret
	}
	passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
		try {
			const user = await Users(jwt_payload._id)
			done(null, user)
		} catch (error) {
			done(null, false)
			throw error
		}
	}))
}