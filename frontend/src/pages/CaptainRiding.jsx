import { Link, useLocation } from "react-router-dom";
import uberlogo from "../assets/uber_logo.png";
import { useRef, useState } from "react";
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import FinishRide from "../components/FinishRide";
import LiveTracking from "../components/LiveTracking";

export default function CaptainRiding() {

  const [ finishRidePanel, setFinishRidePanel ] = useState(false)
  const finishRidePanelRef = useRef(null)

  const location = useLocation()
  const rideData = location.state?.ride

  useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ finishRidePanel ])


  return (
    <div className="h-screen relative flex flex-col justify-end">
      <div className="fixed items-center justify-between w-full top-0 p-5">
        <img className="w-20 " src={uberlogo} />
        <Link
          to="/captain-home"
          className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-full">
        <LiveTracking />
      </div>

      <div onClick={()=>setFinishRidePanel(true)} className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10">
        <h5 className="p-1 text-center w-[90%] absolute top-0">
          <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
        </h5>
        <h4 className="text-xl font-semibold">4 KM away</h4>
        <button className=" bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
          Complete Ride
        </button>
      </div>
      <div ref={finishRidePanelRef} className='fixed w-full z-[500] bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
          <FinishRide 
            ride = {rideData}
            setFinishRidePanel={setFinishRidePanel} 
          />
      </div>
    </div>
  );
}
