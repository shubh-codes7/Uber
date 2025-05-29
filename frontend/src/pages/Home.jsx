import uberLogo from "../assets/uber_logo.png";
import mapImg from "../assets/map.png"
import { useRef, useState } from "react";
import gsap from 'gsap'
import ConfirmRide from '../components/ConfirmRide.jsx'
import {useGSAP} from '@gsap/react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";
import LookingForDriver from "../components/LookingForDriver.jsx";
import WaitingForDriver from "../components/WaitingForDriver.jsx";

const Home = () => {

  const [start, setStart] = useState('')
  const [destination, setDestination] = useState('')
  const [tripPanel, setTripPanel] = useState(false)
  const [vehiclePanel, setvehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [rideFoundPanel, setRideFoundPanel] = useState(false)
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false)

  //trip panel refs, trip form
  const panelRef = useRef()
  const panelCloseRef = useRef()

  //vehicle panel ref, select ride from option
  const vehiclePanelRef = useRef()

  //confirm Ride panel ref, confirm selected ride
  const confirmRidePanelRef = useRef()
  
  //Looking for driver ref
  const rideFoundRef = useRef()
  
  //waiting for Driver Ref
  const waitingForDriverRef = useRef()

  //function with animation to enlarge trip form
  useGSAP(()=>{
    if(tripPanel){
      gsap.to(panelRef.current, {
        height: "70%"
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    }else{
      gsap.to(panelRef.current, {
        height: "0%"
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
    
  }, [tripPanel])

  // function with animation to open vehicle options
  useGSAP(()=>{
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)"
    })
    }else{
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)"
      })
    }
    
  },[vehiclePanel])


  //confirm ride panel
  useGSAP(() => {
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(0)"
      })
    }else{
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [confirmRidePanel])


  // lookingForDriver panel
  useGSAP(()=>{
    if(rideFoundPanel){
      gsap.to(rideFoundRef.current, {
        transform: "translateY(0)",
        height: "100%"
    })
    }else{
      gsap.to(rideFoundRef.current, {
        transform: "translateY(100%)"
      })
    }
    
  },[rideFoundPanel])
  
  
  // waitingForDriver panel
  useGSAP(()=>{
    if(waitingForDriverPanel){
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)",
        height: "100%"
    })
    }else{
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)"
      })
    }
    
  },[waitingForDriverPanel])


  function handleSubmit(e){
    e.preventDefault()
    console.log("submit", "start: ", start, "destination: ", destination)
  }
  return (
    <div className="h-screen relative">
      <img className="w-16 m-8 absolute mb-10" src={uberLogo} />
      <div className="h-screen w-screen">
        <img className="object-cover object-left h-full w-full" src={mapImg}/>
      </div>
      {/* Panel to find trip */}
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        {/* Panel first half of trip input */}
        <div className="bg-white w-full p-5 pl-8 pr-8 relative ">
          <h4 className="text-3xl font-semibold mb-3">Find a trip</h4>
          <i ref={panelCloseRef} onClick={() => setTripPanel(false)} className="ri-arrow-down-wide-line absolute opacity-0 top-4 right-5 text-2xl"></i>
          <form onSubmit={handleSubmit}>
            <input onClick={(e) => {setStart(e.target.value), setTripPanel(true)}} className="border border-gray-300 bg-gray-200 mt-2 mb-3 p-2 rounded w-full text-lg" type="text" placeholder="Add a pick-up location" />
            <input onClick={(e) => {setDestination(e.target.value), setTripPanel(true)}} className="border border-gray-300 bg-gray-200 mt-2 mb-3 p-2 rounded w-full text-lg" type="text" placeholder="Add destination" />
          </form>
        </div>

        {/* Panel second half of locations */}
        <div ref={panelRef} className="bg-white h-0 px-8">
          <LocationSearchPanel setTripPanel={setTripPanel} setvehiclePanel={setvehiclePanel} />
        </div>
      </div>

      <div ref={vehiclePanelRef} className="fixed z-10 bottom-0 bg-white p-2 px-5 w-full translate-y-full">
        <i onClick={() => setvehiclePanel(false)} className="ri-arrow-down-wide-line w-full inline-block text-center text-gray-400 text-2xl"></i>
        <h3 className="mb-3 text-2xl font-semibold">Choose a Vehicle</h3>

        <div onClick={() => setConfirmRidePanel(true)} className="flex w-full border-2 rounded-xl p-3 mb-2 justify-between items-center">
          <img className="w-20" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" />
          <div className="w-1/2">
            <h4 className="font-medium text-xl">UberGo <span><i className="ri-user-line"></i>4</span></h4>
            <h5 className="font-medium text-sm">4 mins away</h5>
            <p className="font-normal text-xs">Affordable, Compact rides</p>
          </div>
          <h2 className="text-2xl font-semibold self-start">₹193.20</h2>
        </div>

        <div onClick={() => setConfirmRidePanel(true)} className="flex w-full border-2 rounded-xl p-3 mb-2 justify-between items-center">
          <img className="w-20" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_768,w_1152/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" />
          <div className="w-1/2">
            <h4 className="font-medium text-xl">UberAuto <span><i className="ri-user-line"></i>3</span></h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs">Affordable, Compact rides</p>
          </div>
          <h2 className="text-2xl font-semibold self-start">₹111.00</h2>
        </div>

        <div onClick={() => setConfirmRidePanel(true)} className="flex w-full border-2 rounded-xl p-3 mb-2 justify-between items-center">
          <img className="w-20" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png" />
          <div className="w-1/2">
            <h4 className="font-medium text-xl">UberMoto <span><i className="ri-user-line"></i>1</span></h4>
            <h5 className="font-medium text-sm">1 mins away</h5>
            <p className="font-normal text-xs">Affordable, Compact rides</p>
          </div>
          <h2 className="text-2xl font-semibold self-start">₹55.20</h2>
        </div>

      </div>

      {/* confirm ride */}
      <div ref={confirmRidePanelRef} className="fixed z-11 bottom-0 bg-white p-5 px-5 w-full translate-y-full">
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setRideFoundPanel={setRideFoundPanel}/>
      </div>
      
      {/* Looking for driver panel */}
      <div ref={rideFoundRef} className="fixed z-11 bottom-0 bg-white p-5 px-5 w-full translate-y-full">
        <LookingForDriver setRideFoundPanel={setRideFoundPanel} />
      </div>
      
      {/* Looking for driver panel */}
      <div ref={waitingForDriverRef} className="fixed z-11 bottom-0 bg-white p-5 px-5 w-full translate-y-full">
        <WaitingForDriver setWaitingForDriverPanel={setWaitingForDriverPanel} />
      </div>
    </div>
  )
}

export default Home
