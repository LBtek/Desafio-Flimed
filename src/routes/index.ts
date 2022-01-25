import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares'
import { userController } from '../controllers'

const router = Router()

router.post('/sign-in', ensureAuthenticated, userController.signIn)
router.post('/sign-up', ensureAuthenticated, userController.signUp)
router.get('/users', ensureAuthenticated, userController.list)
router.get('/user/:id', ensureAuthenticated, userController.show)
router.delete('/user/:id', ensureAuthenticated, userController.remove)

export default router
