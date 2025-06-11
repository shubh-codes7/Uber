import { validationResult } from "express-validator";
import { confirmRideService, createRideService, endRideService, getFareService, startRideService } from "../services/ride.service.js";
import { getAddressCoordinateService, getCaptainInRadiusService } from "../services/map.service.js";
import {sendMessageToSocketId} from '../socket.js'
import Ride from "../models/ride.model.js";

export async function createRide(req, res){
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }

  // console.log("create ride", req.body)
  const { pickup, destination, vehicleType} = req.body

  try{
    const ride = await createRideService({user: req.user._id, pickup, destination, vehicleType })
    res.status(201).json(ride)

    const pickupCoordinates = await getAddressCoordinateService(pickup)

    if (!pickupCoordinates || !pickupCoordinates.ltd || !pickupCoordinates.lng) {
      return res.status(400).json({ 
        message: 'Invalid pickup location coordinates' 
      });
    }

    const captainsInRadius = await getCaptainInRadiusService(pickupCoordinates.ltd, pickupCoordinates.lng, 2)
    // console.log("captain in radius",captainsInRadius)
    ride.otp = ''

    const rideWithUser = await Ride.findOne({_id: ride._id}).populate('user')


    captainsInRadius.map(captain => {
      sendMessageToSocketId(captain.socketId, {
        event: 'new-ride',
        data: rideWithUser
      })
    })

  }catch(error){
    console.log(error)
    return res.status(500).json({message: error.message})
  }
}


export async function getFare(req, res, next){
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }

  const {pickup, destination} = req.query

  try{
    const fare = await getFareService(pickup, destination)
    return res.status(200).json(fare)
  }catch(error){
    return res.status(500).json({message: error.message})
  }
}


export async function confirmRide(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await confirmRideService({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
          })

        return res.status(200).json(ride);
    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

export async function startRide(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await startRideService({ rideId, otp, captain: req.captain });

        console.log(ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export async function endRide(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await endRideService({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })


        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } 
}