export default function ConfirmRide({setConfirmRidePanel, setRideFoundPanel, createRide, pickup, destination, fare, vehicleType}) {
    
    return (
        <div className="h-svh overflow-y-auto">
            <i onClick={()=> {
                setConfirmRidePanel(false)
                }
            } className="ri-arrow-down-wide-line w-full inline-block text-center text-gray-400 text-2xl"></i>
            <h3 className="text-3xl font-semibold mb-5">Confirm your Ride</h3>

            <div className="flex justify-between flex-col items-center">
                <img className="h-30" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" />
                <div className="w-full mt-5">
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="ri-map-pin-user-fill text-3xl"></i>
                        <div>
                            <h3 className="text-lg font-medium">Pickup</h3>
                            <p className="text-base mt-1 text-gray-600">{pickup}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="ri-map-pin-2-fill text-3xl"></i>
                        <div>
                            <h3 className="text-lg font-medium">Destination</h3>
                            <p className="text-base mt-1 text-gray-600">{destination}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-3">
                        <i className="ri-currency-line text-3xl"></i>
                        <div>
                            <h3 className="text-lg font-medium">₹{fare[vehicleType]}</h3>
                            <p className="text-base mt-1 text-gray-600">Cash</p>
                        </div>
                    </div>
                </div>
                <button onClick={()=>{
                    setRideFoundPanel(true)
                    createRide()
                }} className="w-full bg-green-600 text-white text-xl mt-3 font-semibold p-3 rounded-xl">Confirm Ride</button>
            </div>

        </div>
    )
}