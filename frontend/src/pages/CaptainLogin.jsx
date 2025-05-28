import { Link } from "react-router-dom";
import uberLogo from "../assets/uber_logo.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL

const CaptainLogin = () => {
  const navigate = useNavigate()

  const [captain, setCaptain] = useState({
    email: '',
    password: ''
  })

  async function handleSubmit(e){
    e.preventDefault()
    const response = await axios.post(`${BASE_URL}/captain/login`, captain)
    if(response.status === 200){
      navigate('/home')
    }
    
    setCaptain({
      email: '',
      password: ''
    })
  }

  function handleCaptain(e){
    const {name, value} = e.target
    setCaptain(prev => ({...prev, [name]: value}))
  }

  return (
    <div className="p-8 flex flex-col justify-between h-screen">
      <div>
        <img className="w-16 mb-10" src={uberLogo} />
        <form onSubmit={handleSubmit}>
          <label className="text-xl font-medium">What's your Email Captain?</label>
          <input
            type="email"
            placeholder="xyz@gmail.com"
            value={captain.email}
            name="email"
            onChange={handleCaptain}
            className="border border-gray-300 bg-gray-200 mt-2 mb-4 p-2 rounded w-full text-lg"
            required
          />
          <label className="text-xl font-medium">What's your Password?</label>
          <input
            type="password"
            placeholder="password"
            value={captain.password}
            name="password"
            onChange={handleCaptain}
            className="border border-gray-300 bg-gray-200 mt-2 mb-4 p-2 rounded w-full text-lg"
            required
          />
          <button type="submit" className="text-center text-xl w-full bg-black text-white py-3 rounded mt-4">
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-700">Don't have an account? </span>
          <Link to="/captain-signup" className="text-blue-500">
            Sign Up
          </Link>
        </div>
      </div>
      <div>
        <Link
          to="/login"
          className="inline-block text-center text-xl w-full bg-black text-white py-3 rounded mt-4"
        >
          Login as User
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin
