//this is for Captain

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ConfirmRidePopup({
  setRidePopupPanel,
  setConfirmRidePopupPanel,
  ride
}) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('')

  async function handleSubmit(e){
    e.preventDefault()    
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/start-ride`, {
      params: {
        rideId: ride._id,
        otp: otp
      },
      withCredentials: true
    })

    if(response.status === 200){
      setConfirmRidePopupPanel(false)
      setRidePopupPanel(false)
      navigate("/captain-riding", {state: {ride: ride}})
    }
  }
  return (
    <div>
      <i
        onClick={() => setConfirmRidePopupPanel(false)}
        className="ri-arrow-down-wide-line w-full inline-block text-center mt-3 text-gray-400 text-2xl"
      ></i>
      <h3 className="text-3xl font-semibold mt-2 mb-7">Confirm Ride</h3>

      <div className="flex items-center justify-between p-3 bg-amber-300 rounded-lg">
        <div className="flex items-center justify-start gap-3">
          <img
            className="rounded-full w-13 h-13 object-cover"
            src="https://cbx-prod.b-cdn.net/COLOURBOX30246605.jpg?width=800&height=800&quality=70"
          />
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
              <p className="text-base mt-1 text-gray-600">
                {ride?.pickup}
              </p>
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
        <div className="mt-6 w-full">
          <form onSubmit={handleSubmit}>
            <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" placeholder="Enter OTP" className="border font-mono mx-auto border-gray-300 bg-gray-200 m-1 p-2 rounded w-1/2 block text-lg" />
            <button
              type="submit"
              className="w-full bg-green-600 text-white text-xl mt-3 font-semibold p-3 rounded-xl"
            >
              Confirm Ride
            </button>
            <button
              onClick={() => {
                setRidePopupPanel(false);
                setConfirmRidePopupPanel(false);
              }}
              className="w-full bg-red-500 text-white text-xl mt-3 font-semibold p-3 rounded-xl"
            >
              Cancel Ride
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
