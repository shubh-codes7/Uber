
const LocationSearchPanel = ({ activeField, suggestions, setPickup, setDestination}) => {
  
  return (
    <div className="overflow-y-auto" >

      {
        suggestions.length > 0 && suggestions.map((location, index) => {
          return (
          <div key={index} onClick={()=> activeField === 'pickup' ? setPickup(location.description) : setDestination(location.description)} className="flex justify-start gap-4 items-center border-2 border-gray-100 active:border-black rounded-xl p-2 mb-2">
            <h5><i className="ri-map-pin-2-line text-xl "></i></h5>
            <h4 className="font-base">{location.description}</h4>
          </div>)
        })
      }
    </div>
  )
}

export default LocationSearchPanel
