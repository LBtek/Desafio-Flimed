import passport from 'passport'
import { BasicStrategy } from 'passport-http'
import { User } from '../models'
const bcrypt = require('bcrypt')

export const notAuthorizedJson = { status: 401, message: 'Não autorizado' }

passport.use(
  new BasicStrategy(async (email, password, done) => {
    if (email && password) {
      const user = await User.findOne({
        where: { email }
      })
      if (user) {
        await bcrypt.compare(password, user.password).then(function (result: boolean) {
          if (result) return done(null, user)
        })
      } else return done(notAuthorizedJson, false)
    } else return done(notAuthorizedJson, false)
  })
)

export default passport
