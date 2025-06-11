import { Link } from "react-router-dom";
import uberLogo from "../assets/uber_logo.png";
import { useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useNavigate } from "react-router-dom";

const CaptainSignup = () => {
  const navigate = useNavigate();

  const [captain, setCaptain] = useState({
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
    const response = await axios.post(`${BASE_URL}/captain/register`, captain, {withCredentials: true});
    if (response.status === 201) {
      navigate("/captain-home");
    }

    setCaptain({
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
  }

  function handleCaptain(e) {
    const { name, value } = e.target;

    if (name === "firstname" || name === "lastname") {
      setCaptain((prev) => ({
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
      setCaptain((prev) => ({
        ...prev,
        vehicle: {
          ...prev.vehicle,
          [name]: value,
        },
      }));
    } else {
      setCaptain((prev) => ({ ...prev, [name]: value }));
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
              value={captain.fullname.firstname}
              name="firstname"
              onChange={handleCaptain}
              className="border border-gray-300 bg-gray-200 mt-2 mb-4 p-2 rounded w-full text-lg"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={captain.fullname.lastname}
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

          <label className="text-xl font-medium">Vehicle Information</label>
          <div className="flex flex-wrap ">
            <input
              type="text"
              placeholder="Vehicle color"
              value={captain.vehicle.color}
              name="color"
              onChange={handleCaptain}
              className="border border-gray-300 bg-gray-200 mt-2 mb-4 p-2 w-1/2 rounded text-lg"
              required
            />
            <input
              type="text"
              placeholder="Plate number"
              value={captain.vehicle.plate}
              name="plate"
              onChange={handleCaptain}
              className="border border-gray-300 bg-gray-200 mt-2 mb-4 p-2 w-1/2 rounded text-lg"
              required
            />
            <input
              type="number"
              placeholder="Vehicle Capacity"
              value={captain.vehicle.capacity}
              name="capacity"
              onChange={handleCaptain}
              className="border border-gray-300 bg-gray-200 mt-2 mb-4 p-2 w-1/2 rounded text-lg"
              required
            />
            <select
              name="type"
              value={captain.vehicle.type}
              onChange={handleCaptain}
              required
              className="border border-gray-300 bg-gray-200 mt-2 mb-4 p-2 w-1/2 rounded text-lg"
            >
              <option disabled>-Vehicle Type-</option>
              <option value="car">car</option>
              <option value="auto">auto</option>
              <option value="motorcycle">motorcycle</option>
            </select>
          </div>

          <button
            type="submit"
            className="text-center text-xl w-full bg-black text-white py-3 rounded mt-4"
          >
            Create Captain Account
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
