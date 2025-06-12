import { Link } from "react-router-dom";
import React from 'react'
import uberLogo from "../assets/uber_logo.png";
import { useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainSignup = () => {
  const navigate = useNavigate();
  const { setCaptain } = React.useContext(CaptainDataContext)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
    vehicle: {
      color: "",
      plate: "",
      capacity: "",
      type: "",
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)
    setError(false)

    try{
      const response = await axios.post(`${BASE_URL}/captain/register`, formData, {withCredentials: true});
      setCaptain(response.data.captain)
      localStorage.setItem('captainToken', response.data.token);

      setFormData({
        fullname: {
          firstname: "",
          lastname: "",
        },
        email: "",
        password: "",
        vehicle: {
          color: "",
          plate: "",
          capacity: "",
          type: "",
        },
      })
      navigate("/captain-home");
    }catch(err){
      setError(err.response?.data?.errors || err.response?.data?.message || 'An error occurred during Signup');
    }finally{
      setLoading(false)
    }
    

    
  }

  function handleCaptain(e) {
    const { name, value } = e.target;

    if (name === "firstname" || name === "lastname") {
      setFormData((prev) => ({
        ...prev,
        fullname: {
          ...prev.fullname,
          [name]: value,
        },
      }));
    } else if (
      name === "color" ||
      name === "plate" ||
      name === "capacity" ||
      name === "type"
    ) {
      setFormData((prev) => ({
        ...prev,
        vehicle: {
          ...prev.vehicle,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  return (
    <div className="p-8 flex flex-col justify-between h-screen">
      <div>
        <img className="w-16 mb-10" src={uberLogo} />
        <form onSubmit={handleSubmit}>
          <label className="text-xl font-medium">Enter your Name Captain</label>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={formData.fullname.firstname}
              name="firstname"
              onChange={handleCaptain}
              className="border border-gray-300 bg-gray-200 mt-2 mb-4 p-2 rounded w-full text-lg"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.fullname.lastname}
              name="lastname"
              onChange={handleCaptain}
              className="border border-gray-300 bg-gray-200 mt-2 mb-4 p-2 rounded w-full text-lg"
              required
            />
          </div>
          <label className="text-xl font-medium">
            What's your Email Captain?
          </label>
          <input
            type="email"
            placeholder="xyz@gmail.com"
            value={formData.email}
            name="email"
            onChange={handleCaptain}
            className="border border-gray-300 bg-gray-200 mt-2 mb-4 p-2 rounded w-full text-lg"
            required
          />
          <label className="text-xl font-medium">What's your Password?</label>
          <input
            type="password"
            placeholder="password"
            value={formData.password}
            name="password"
            onChange={handleCaptain}
            className="border border-gray-300 bg-gray-200 mt-2 mb-4 p-2 rounded w-full text-lg"
            required
          />

          <label className="text-xl font-medium">Vehicle Information</label>
          <div className="flex flex-wrap ">
            <input
              type="text"
              placeholder="Vehicle color"
              value={formData.vehicle.color}
              name="color"
              onChange={handleCaptain}
              className="border border-gray-300 bg-gray-200 mt-2 mb-4 p-2 w-1/2 rounded text-lg"
              required
            />
            <input
              type="text"
              placeholder="Plate number"
              value={formData.vehicle.plate}
              name="plate"
              onChange={handleCaptain}
              className="border border-gray-300 bg-gray-200 mt-2 mb-4 p-2 w-1/2 rounded text-lg"
              required
            />
            <input
              type="number"
              placeholder="Vehicle Capacity"
              value={formData.vehicle.capacity}
              name="capacity"
              onChange={handleCaptain}
              className="border border-gray-300 bg-gray-200 mt-2 mb-4 p-2 w-1/2 rounded text-lg"
              required
            />
            <select
              name="type"
              value={formData.vehicle.type}
              onChange={handleCaptain}
              required
              className="border border-gray-300 bg-gray-200 mt-2 mb-4 p-2 w-1/2 rounded text-lg"
            >
              <option value="" disabled>-Vehicle Type-</option>
              <option value="car">car</option>
              <option value="auto">auto</option>
              <option value="motorcycle">motorcycle</option>
            </select>
          </div>

          {Array.isArray(error) && error.map(er => <p className="text-red-500 text-sm mb-4">{er.msg}</p>)}
          { typeof error === 'string' && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="text-center text-xl w-full bg-black text-white py-3 rounded mt-4"
          >
            {loading ? "Creating Account.." : "Create Captain Account"}
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-700">Already have an account? </span>
          <Link to="/captain-login" className="text-blue-500">
            Login
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
  );
};

export default CaptainSignup;
