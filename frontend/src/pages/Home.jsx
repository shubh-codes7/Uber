import uberLogo from "../assets/uber_logo.png";
import mapImg from "../assets/map.png"
import { useRef, useState } from "react";
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import 'remixicon/fonts/remixicon.css'

const Home = () => {

  const [start, setStart] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)

  const panelRef = useRef()
  const panelCloseRef = useRef()

  useGSAP(()=>{
    if(panelOpen){
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
    
  }, [panelOpen])


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
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="bg-white w-full p-5 pl-8 pr-8 relative">
          <h4 className="text-3xl font-semibold mb-3">Find a trip</h4>
          <i ref={panelCloseRef} onClick={() => setPanelOpen(false)} className="ri-arrow-down-wide-line absolute opacity-0 top-4 right-5 text-2xl"></i>
          <form onSubmit={handleSubmit}>
            <input onClick={(e) => {setStart(e.target.value), setPanelOpen(true)}} className="border border-gray-300 bg-gray-200 mt-2 mb-3 p-2 rounded w-full text-lg" type="text" placeholder="Add a pick-up location" />
            <input onClick={(e) => {setDestination(e.target.value), setPanelOpen(true)}} className="border border-gray-300 bg-gray-200 mt-2 mb-3 p-2 rounded w-full text-lg" type="text" placeholder="Add destination" />
          </form>
        </div>

        <div ref={panelRef} className="bg-red-400 h-0">

        </div>
        
      </div>
    </div>
  )
}

export default Home
