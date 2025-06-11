export default function RidePopup({setRidePopupPanel, setConfirmRidePopupPanel, ride, confirmRide}) {
    
    return (
        <div>
            <i onClick={()=>setRidePopupPanel(false)} className="ri-arrow-down-wide-line w-full inline-block text-center text-gray-400 text-2xl"></i>
            <h3 className="text-3xl font-semibold mb-7">A Ride for you!</h3>

            <div className="flex items-center justify-between p-3 bg-amber-300 rounded-lg">
              <div className="flex items-center justify-start gap-3">
                <img className="rounded-full w-13 h-13 object-cover" src="https://cbx-prod.b-cdn.net/COLOURBOX30246605.jpg?width=800&height=800&quality=70" />
                <h4 className="text-lg font-medium">{ride?.user.fullname?.firstname + " " + ride?.user.fullname?.lastname}</h4>
              </div>
              <h5 className="font-medium">2.2 KM</h5>
            </div>

            <div className="flex justify-between flex-col items-center">
                <div className="w-full mt-5">
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="ri-map-pin-user-fill text-3xl"></i>
                        <div>
                            <h3 className="text-lg font-medium">Pickup</h3>
                            <p className="text-base mt-1 text-gray-600">{ride?.pickup}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="ri-map-pin-2-fill text-3xl"></i>
                        <div>
                            <h3 className="text-lg font-medium">Destination</h3>
                            <p className="text-base mt-1 text-gray-600">{ride?.destination}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-3">
                        <i className="ri-currency-line text-3xl"></i>
                        <div>
                            <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
                            <p className="text-base mt-1 text-gray-600">Cash</p>
                        </div>
                    </div>
                </div>
                <button onClick={()=>{
                    setConfirmRidePopupPanel(true)
                    confirmRide()
                    }} className="w-full bg-green-600 text-white text-xl mt-3 font-semibold p-3 rounded-xl">Accept Ride</button>
                <button  onClick={()=>setRidePopupPanel(false)} className="w-full bg-gray-200 text-gray-700 text-xl mt-3 font-semibold p-3 rounded-xl">Ignore Ride</button>
            </div>

        </div>
    )
}