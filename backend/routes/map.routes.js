import {Router} from 'express'
import { query } from 'express-validator'
import { authUser } from '../middlewares/auth.middleware.js'
import { getAutoCompleteSuggestions, getCoordinates, getDistanceTime } from '../controllers/map.controller.js'

const mapRouter = Router()

mapRouter.get('/get-coordinates', 
  query('address').isString().isLength({min: 3 }),
  authUser,
  getCoordinates
)

mapRouter.get('/get-distance-time', 
  query('origin').isString().isLength({min: 3 }),
  query('destination').isString().isLength({min: 3 }),
  authUser,
  getDistanceTime
)

mapRouter.get('/get-suggestions',
  query('input').isString().isLength({min:3}),
  authUser,
  getAutoCompleteSuggestions
)

export default mapRouter