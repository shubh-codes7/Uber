import uberLogo from "../assets/uber_logo.png";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ConfirmRide from "../components/ConfirmRide.jsx";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import LookingForDriver from "../components/LookingForDriver.jsx";
import WaitingForDriver from "../components/WaitingForDriver.jsx";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import { SocketContext } from '../context/SocketContext.jsx';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext.jsx';
import LiveTracking from '../components/LiveTracking.jsx'
import { toast } from "react-toastify";

const Home = () => {

  const [error, setError] = useState(null)

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupSuggestions, setPickupSuggestions ] = useState([])
  const [destinationSuggestions, setDestinationSuggestions ] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [tripPanel, setTripPanel] = useState(false);
  const [vehiclePanel, setvehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [rideFoundPanel, setRideFoundPanel] = useState(false);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)

  const navigate = useNavigate()


  useEffect(() => {
    if (pickup.length < 4 || pickup.length > 30) return;

    const handler = setTimeout(() => {
      axios
        .get(
          `${import.meta.env.VITE_BASE_URL}/map/get-suggestions?input=${pickup}`
        )
        .then((data) => setPickupSuggestions(data.data));
    }, 400); // 400ms debounce

    return () => clearTimeout(handler); // Cleanup on change/unmount
  }, [pickup]);
  
  
  useEffect(() => {
    if (destination.length < 4 || destination.length > 30) return;

    const handler = setTimeout(() => {
      axios
        .get(
          `${import.meta.env.VITE_BASE_URL}/map/get-suggestions?input=${destination}`
        )
        .then((data) => setDestinationSuggestions(data.data));
    }, 400); // 400ms debounce

    return () => clearTimeout(handler); // Cleanup on change/unmount
  }, [destination]);



  async function findTrip(){
    if(!pickup || !destination){
      return setError("Both fields are required")
    }
    setvehiclePanel(true)
    setTripPanel(false)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/get-fare`, {
      params: { pickup, destination },
      
    })

    setFare(response.data)
  }


  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/ride/create`,
      {
        pickup,
        destination,
        vehicleType
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
  );

  console.log("ride info", response.data)

}

  //trip panel refs, trip form
  const panelRef = useRef();
  const panelCloseRef = useRef();

  //vehicle panel ref, select ride from option
  const vehiclePanelRef = useRef();

  //confirm Ride panel ref, confirm selected ride
  const confirmRidePanelRef = useRef();

  //Looking for driver ref
  const rideFoundRef = useRef();

  //waiting for Driver Ref
  const waitingForDriverRef = useRef();

  //function with animation to enlarge trip form
  useGSAP(() => {
    if (tripPanel) {
      gsap.to(panelRef.current, {
        height: "80%",
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
    }
  }, [tripPanel]);

  // function with animation to open vehicle options
  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanel]);

  //confirm ride panel
  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(0)",
        display: "block"
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(100%)",
        display: "none"
      });
    }
  }, [confirmRidePanel]);

  // lookingForDriver panel
  useGSAP(() => {
    if (rideFoundPanel) {
      gsap.to(rideFoundRef.current, {
        transform: "translateY(0)",
        height: "100%",
        display: "block"
      });
    } else {
      gsap.to(rideFoundRef.current, {
        transform: "translateY(100%)",
        display: "none"
      });
    }
  }, [rideFoundPanel]);

  // waitingForDriver panel
  useGSAP(() => {
    if (waitingForDriverPanel) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)",
        height: "100%",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriverPanel]);


  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  // useEffect(() => {
  //   socket.emit("join", { userType: "user", userId: user._id })
  // }, [user])

  //   socket.on('ride-confirmed', ride => {
  //     console.log("listening ride confiremed in home")
  //     toast.success("ride accepted by captain!")
  //     setvehiclePanel(false)
  //     setWaitingForDriverPanel(true)
  //     setRide(ride)
  //   })

  //   socket.on('ride-started', ride => {
  //     toast.info('ride-started')
  //     setWaitingForDriverPanel(false)
  //     navigate('/riding', { state: { ride } })
  //   })


  useEffect(() => {
  socket.emit("join", { userType: "user", userId: user._id })

  // Add socket event listeners
  const handleRideConfirmed = (ride) => {
    console.log("listening ride confirmed in home")
    toast.success("ride accepted by captain!")
    setvehiclePanel(false)
    setWaitingForDriverPanel(true)
    setRide(ride)
  }

  const handleRideStarted = (ride) => {
    toast.info('ride-started')
    setWaitingForDriverPanel(false)
    navigate('/riding', { state: { ride } })
  }

  // Attach event listeners
  socket.on('ride-confirmed', handleRideConfirmed)
  socket.on('ride-started', handleRideStarted)

  // Cleanup function to remove listeners
  return () => {
    socket.off('ride-confirmed', handleRideConfirmed)
    socket.off('ride-started', handleRideStarted)
  }
}, [socket, user._id, navigate]) 
 

  
  return (
    <div className="h-svh relative">
      <img className="w-16 m-8 absolute mb-10" src={uberLogo} />
      <div className="h-3/5 w-screen">
        <LiveTracking />
      </div>
      {/* Panel to find trip */}
      <div className="flex flex-col justify-end h-svh absolute top-0 w-full">
        {/* Panel first half of trip input */}
        <div className="bg-white w-full p-5 pl-8 pr-8 relative ">
          <h4 className="text-3xl font-semibold mb-3">Find a trip</h4>
          <i
            ref={panelCloseRef}
            onClick={() => setTripPanel(false)}
            className="ri-arrow-down-wide-line absolute opacity-0 top-4 right-5 text-2xl"
          ></i>
          <form>
            <input
              onClick={() => {
                setTripPanel(true)
                setActiveField('pickup')
                setError('')
              }}

              onChange={(e) => {
                setPickup(e.target.value);
              }}
              value={pickup}
              className="border border-gray-300 bg-gray-200 mt-2 mb-3 p-2 rounded w-full text-lg"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setTripPanel(true)
                setActiveField('destination')
              }}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              value={destination}
              className="border border-gray-300 bg-gray-200 mt-2 mb-3 p-2 rounded w-full text-lg"
              type="text"
              placeholder="Add destination"
            />
          </form>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            onClick={findTrip}
            className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
            Find Trip
          </button>
        </div>

        {/* Panel second half of suggestions */}
        <div ref={panelRef} className="bg-white h-0 px-8">
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed z-10 bottom-0 bg-white p-2 px-5 w-full translate-y-full"
      >
        <i
          onClick={() => setvehiclePanel(false)}
          className="ri-arrow-down-wide-line w-full inline-block text-center text-gray-400 text-2xl"
        ></i>
        <h3 className="mb-3 text-2xl font-semibold">Choose a Vehicle</h3>

        <div
          onClick={() => {
            setConfirmRidePanel(true)
            setVehicleType('car')
          }}
          className="flex w-full border-2 rounded-xl p-3 mb-2 justify-between items-center"
        >
          <img
            className="w-20"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
          />
          <div className="w-1/2">
            <h4 className="font-medium text-xl">
              UberGo{" "}
              <span>
                <i className="ri-user-line"></i>4
              </span>
            </h4>
            <h5 className="font-medium text-sm">4 mins away</h5>
            <p className="font-normal text-xs">Affordable, Compact rides</p>
          </div>
          <h2 className="text-2xl font-semibold self-start">₹{fare?.car}</h2>
        </div>

        <div
          onClick={() => {
            setConfirmRidePanel(true)
            setVehicleType('auto')
          }}
          className="flex w-full border-2 rounded-xl p-3 mb-2 justify-between items-center"
        >
          <img
            className="w-20"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_768,w_1152/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          />
          <div className="w-1/2">
            <h4 className="font-medium text-xl">
              UberAuto{" "}
              <span>
                <i className="ri-user-line"></i>3
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs">Affordable, Compact rides</p>
          </div>
          <h2 className="text-2xl font-semibold self-start">₹{fare?.auto}</h2>
        </div>

        <div
          onClick={() => {
            setConfirmRidePanel(true)
            setVehicleType('moto')
          }}
          className="flex w-full border-2 rounded-xl p-3 mb-2 justify-between items-center"
        >
          <img
            className="w-20"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png"
          />
          <div className="w-1/2">
            <h4 className="font-medium text-xl">
              UberMoto{" "}
              <span>
                <i className="ri-user-line"></i>1
              </span>
            </h4>
            <h5 className="font-medium text-sm">1 mins away</h5>
            <p className="font-normal text-xs">Affordable, Compact rides</p>
          </div>
          <h2 className="text-2xl font-semibold self-start">₹{fare?.moto}</h2>
        </div>
      </div>

      {/* confirm ride */}
      <div
        ref={confirmRidePanelRef}
        className="fixed z-11 bottom-0 bg-white p-5 px-5 w-full translate-y-full"
      >
        <ConfirmRide
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          createRide={createRide}
          setConfirmRidePanel={setConfirmRidePanel}
          setRideFoundPanel={setRideFoundPanel}
        />
      </div>

      {/* Looking for driver panel */}
      <div
        ref={rideFoundRef}
        className="fixed z-11 bottom-0 bg-white p-5 px-5 w-full translate-y-full"
      >
        <LookingForDriver 
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setRideFoundPanel={setRideFoundPanel} 
          createRide={createRide}
        />
      </div>

      {/* Looking for driver panel */}
      <div
        ref={waitingForDriverRef}
        className="fixed z-11 bottom-0 bg-white p-5 px-5 w-full translate-y-full"
      >
        <WaitingForDriver 
          ride={ride}
          setRideFoundPanel={setRideFoundPanel}
          waitingForDriverPanel={waitingForDriverPanel}
          setWaitingForDriverPanel={setWaitingForDriverPanel} 
        />
      </div>
    </div>
  );
};

export default Home;
