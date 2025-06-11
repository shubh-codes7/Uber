import { Link, useNavigate } from "react-router-dom";
import uberLogo from "../assets/uber_logo.png";
import { useState } from "react";
import axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL;

const UserSignup = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState({
    fullname: {
      firstname: '',
      lastname: ''
    },
    email: '',
    password: ''
  })

  async function handleSubmit(e){
    e.preventDefault()
    
    const response = await axios.post(`${BASE_URL}/user/register`, user,
      {withCredentials: true}
    );
    if(response.status === 201){
      navigate('/home')
    }

    setUser({
    fullname: {
      firstname: '',
      lastname: ''
    },
    email: '',
    password: ''
    })
  }

  function handleUser(e){
    const {name, value} = e.target
    if(name === "firstname" || name === "lastname") {
      setUser(prev => ({
        ...prev,
        fullname: {
          ...prev.fullname,
          [name] : value
        }
      }))
    }else{
      setUser(prev => ({...prev, [name]: value}))
    }
  }

  return (
    <div className="p-8 flex flex-col h-screen">
        <img className="w-16 mb-10" src={uberLogo} />
        <form onSubmit={handleSubmit}>
          <label className="text-xl font-medium">Enter your Name</label>
          <div className="flex gap-4">
            <input
            type="text"
            placeholder="First Name"
            value={user.fullname.firstname}
            name="firstname"
            onChange={handleUser}
            className="border border-gray-300 bg-gray-200 mt-2 mb-4 p-2 rounded w-full text-lg"
            required
          />
            <input
              type="text"
              placeholder="Last Name"
              value={user.fullname.lastname}
              name="lastname"
              onChange={handleUser}
              className="border border-gray-300 bg-gray-200 mt-2 mb-4 p-2 rounded w-full text-lg"
              required
            />

          </div>
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
            Create Account
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-700">Already have an account? </span>
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </div>
    </div>
  )
}

export default UserSignup
