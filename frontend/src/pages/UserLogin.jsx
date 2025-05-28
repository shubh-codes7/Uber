import { Link, useNavigate } from "react-router-dom";
import uberLogo from "../assets/uber_logo.png";
import { useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const UserLogin = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  async function handleSubmit(e){
    e.preventDefault()

    const res = await axios.post(`${BASE_URL}/user/login`, user)
    
    if(res.status === 200){
      alert("logged in")
    }

    navigate('/home')

    setUser({
      email: '',
      password: ''
    })
  }

  function handleUser(e){
    const {name, value} = e.target
    setUser(prev => ({...prev, [name]: value}))
  }

  return (
    <div className="p-8 flex flex-col justify-between h-screen">
      <div>
        <img className="w-16 mb-10" src={uberLogo} />
        <form onSubmit={handleSubmit}>
          <label className="text-xl font-medium">What's your Email?</label>
          <input
            type="email"
            placeholder="xyz@gmail.com"
            value={user.email}
            name="email"
            onChange={handleUser}
            className="border border-gray-300 bg-gray-200 mt-2 mb-4 p-2 rounded w-full text-lg"
            required
          />
          <label className="text-xl font-medium">What's your Password?</label>
          <input
            type="password"
            placeholder="password"
            value={user.password}
            name="password"
            onChange={handleUser}
            className="border border-gray-300 bg-gray-200 mt-2 mb-4 p-2 rounded w-full text-lg"
            required
          />
          <button type="submit" className="text-center text-xl w-full bg-black text-white py-3 rounded mt-4">
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-700">Don't have an account? </span>
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </div>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="inline-block text-center text-xl w-full bg-black text-white py-3 rounded mt-4"
        >
          Login as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
