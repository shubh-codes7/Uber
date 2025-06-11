import axios from 'axios'
import Captain from '../models/captain.model.js'

export async function getAddressCoordinateService(address){
  const apiKey = process.env.MAP_API
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`

  try{
    const response = await axios.get(url)
    if(response.data.status === 'OK'){
      const location = response.data.results[0].geometry.location
      return {
        ltd: location.lat,
        lng: location.lng
      }
    }else{
      throw new Error('Unable to fetch coordinates')
    }
  }catch(error){
    console.log(error)
    throw error
  }
}


export async function getDistanceTimeService(origin, destination) {
  if(!origin || !destination){
    throw new Error('Origin and Destination are both required')
  }

  const apiKey = process.env.MAP_API;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
      if(response.data.rows[0].elements[0].status === 'ZERO_RESULTS'){
        throw new Error('No routes found')
      }
      return response.data.rows[0].elements[0]
    } else {
      throw new Error('Unable to fetch distance and time');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function getSuggestionsService(input){
  if(!input){
    throw new Error('Query is required')
  }

  const apiKey = process.env.MAP_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
      return response.data.predictions
    } else {
      throw new Error('Unable to fetch suggestions');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }

}

export async function getCaptainInRadiusService(ltd, lng, radius){
  const captains = await Captain.find({
    location: {
      $geoWithin: {
        $centerSphere: [ [ ltd, lng ], radius / 6371 ]
      }
    }
  });

  return captains;
}