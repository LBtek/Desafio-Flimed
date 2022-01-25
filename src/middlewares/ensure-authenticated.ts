import passport, { notAuthorizedJson } from '../config/passport'
import { Request, Response, NextFunction } from 'express'

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('basic', (err, user) => {
    user ? (req.user = user) : null
    return user ? next() : next(notAuthorizedJson)
  })(req, res, next)
}
