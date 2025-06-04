import { Link } from "react-router-dom";
import uberlogo from '../assets/uber_logo.png'
import RidePopup from "../components/RidePopup";
import { useRef, useState } from "react";
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopup from "../components/ConfirmRidePopup";

export default function CaptainHome() {

    const [ridePopupPanel, setRidePopupPanel] = useState(true)
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)

    const ridePopupRef = useRef()
    const confirmRidePopupRef = useRef()

    useGSAP(()=>{
        if(ridePopupPanel){
            gsap.to(ridePopupRef.current, {
                transform: "translateY(0)"
            }) 
        }else{
            gsap.to(ridePopupRef.current, {
                transform: "translateY(100%)"
            }) 
        }
        
    }, [ridePopupPanel])


    useGSAP(()=>{
        if(confirmRidePopupPanel){
            gsap.to(confirmRidePopupRef.current, {
                transform: "translateY(0)"
            }) 
        }else{
            gsap.to(confirmRidePopupRef.current, {
                transform: "translateY(100%)"
            }) 
        } 
        
    }, [confirmRidePopupPanel])
    
    return (
        <div className='h-screen'>
            
            <div className="fixed items-center justify-between w-full top-0 p-5">
                <img className="w-20 " src={uberlogo}/>
                <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className='h-3/5'>
                <img className="object-cover h-full w-full" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"/>
            </div>
            
            <div className='h-2/5 p-4'>
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start gap-3">
                        <img className="rounded-full w-13 h-13 object-cover" src="https://cbx-prod.b-cdn.net/COLOURBOX30246605.jpg?width=800&height=800&quality=70" />
                        <h4 className="text-lg font-medium">Shubham Rathod</h4>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold">₹111</h4>
                        <p className="text-sm text-gray-600">Earned</p>
                    </div>
                </div>
                <div className="flex p-3 bg-gray-300 rounded-2xl mt-3 justify-center gap-5 items-start">
                    <div className="text-center">
                        <i className="text-3xl mb-2 font-thin ri-timer-2-line" />
                        <h5 className="text-lg font-medium">10.2</h5>
                        <p className="text-sm text-gray-600">Hours online</p>
                    </div>
                    <div className="text-center">
                        <i className="text-3xl mb-2 font-thin ri-speed-up-line" />
                        <h5 className="text-lg font-medium">10.2</h5>
                        <p className="text-sm text-gray-600">Hours online</p>
                    </div>
                    <div className="text-center">
                        <i className="text-3xl mb-2 font-thin ri-booklet-line" />
                        <h5 className="text-lg font-medium">10.2</h5>
                        <p className="text-sm text-gray-600">Hours online</p>
                    </div>
                </div>
            </div>


            <div ref={ridePopupRef} className="fixed z-11 bottom-0 bg-white p-5 px-5 w-full translate-y-full">
                <RidePopup setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
            </div>
            
            <div ref={confirmRidePopupRef} className="fixed h-screen z-11 bottom-0 bg-white p-5 px-5 w-full translate-y-full">
                <ConfirmRidePopup setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}/>
            </div>
            
        </div>
    )
}