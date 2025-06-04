import {getDistanceTimeService, getAddressCoordinateService} from '../services/map.service.js'
import { validationResult } from 'express-validator'
import { getSuggestionsService } from '../services/map.service.js'

export async function getCoordinates(req, res, next){
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }

  const {address} = req.query

  try{
    const coordinates = await getAddressCoordinateService(address)
    res.status(200).json(coordinates)
  }catch(error){
    res.status(404).json({message: "Coordinate not found"})
  }
}

export async function getDistanceTime(req, res, next){
  try{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()})
    }

    const { origin, destination } = req.query
    const distanceTime = await getDistanceTimeService(origin, destination)
    res.status(200).json(distanceTime)
  }catch(error){
    console.log(error)
    res.status(500).json({message: 'Internal server error'})
  }
}




export async function getAutoCompleteSuggestions(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { input } = req.query

  try {
    const suggestions = await getSuggestionsService(input)
    res.status(200).json(suggestions)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch autocomplete suggestions' })
  }
}
