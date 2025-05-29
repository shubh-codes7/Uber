

const LocationSearchPanel = ({setTripPanel, setvehiclePanel}) => {

  // dummy data
  const locations = [
    '15B, Dnyanda Appt., Abhiyanta nagar, Cidco, Nashik 422008',
    '1-A, Paradise Villa, New York City, United States'
  ]

  return (
    <div>

      {
        locations.map((location) => {
          return (
          <div onClick={()=>{setvehiclePanel(true), setTripPanel(false)}} className="flex justify-start gap-4 items-center border-2 border-gray-100 active:border-black rounded-xl p-2 mb-2">
            <h5><i className="ri-map-pin-2-line text-xl "></i></h5>
            <h4 className="font-medium">{location}</h4>
          </div>)
        })
      }
    </div>
  )
}

export default LocationSearchPanel
