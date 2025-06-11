import { Link, useNavigate } from "react-router-dom";
import uberLogo from "../assets/uber_logo.png";
import { UserDataContext } from '../context/UserContext'
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const UserLogin = () => {
const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ userData, setUserData ] = useState({})

  const { user, setUser } = useContext(UserDataContext)
  const navigate = useNavigate()



  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, userData)

    if (response.status === 200) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }


    setEmail('')
    setPassword('')
  }


  return (
    <div className="p-8 flex flex-col justify-between h-screen">
      <div>
        <img className="w-16 mb-10" src={uberLogo} />
        <form onSubmit={submitHandler}>
          <label className="text-xl font-medium">What's your Email?</label>
          <input
            type="email"
            placeholder="xyz@gmail.com"
            value={email}
            name="email"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className="border border-gray-300 bg-gray-200 mt-2 mb-4 p-2 rounded w-full text-lg"
            required
          />
          <label className="text-xl font-medium">What's your Password?</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            name="password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
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
