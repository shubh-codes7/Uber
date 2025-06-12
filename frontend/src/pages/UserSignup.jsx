import { Link, useNavigate } from "react-router-dom";
import uberLogo from "../assets/uber_logo.png";
import { useContext, useState } from "react";
import axios from 'axios'
import { UserDataContext } from "../context/UserContext";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const UserSignup = () => {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')


  const [formData, setFormData] = useState({
    fullname: {
      firstname: '',
      lastname: ''
    },
    email: '',
    password: ''
  })

  const { setUser } = useContext(UserDataContext)

  async function handleSubmit(e){
    e.preventDefault();
    setLoading(true)
    setError(false)

    try{
      const response = await axios.post(`${BASE_URL}/user/register`, formData,{withCredentials: true})
      const data = response.data
      localStorage.setItem('userToken', data.token)
      setUser(data.user)

      setFormData({
        fullname: {
          firstname: '',
          lastname: ''
        },
        email: '',
        password: ''
      })  

      navigate('/home')

    }catch(err){
      setError(err.response?.data?.errors || err.response?.data?.message || 'An error occurred during Signup');
    }finally{
      setLoading(false)
    }
  }

  function handleUser(e){
    const {name, value} = e.target
    if(name === "firstname" || name === "lastname") {
      setFormData(prev => ({
        ...prev,
        fullname: {
          ...prev.fullname,
          [name] : value
        }
      }))
    }else{
      setFormData(prev => ({...prev, [name]: value}))
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
            value={formData.fullname.firstname}
            name="firstname"
            onChange={handleUser}
            className="border border-gray-300 bg-gray-200 mt-2 mb-4 p-2 rounded w-full text-lg"
            required
          />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.fullname.lastname}
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
            value={formData.email}
            name="email"
            onChange={handleUser}
            className="border border-gray-300 bg-gray-200 mt-2 mb-4 p-2 rounded w-full text-lg"
            required
          />
          <label className="text-xl font-medium">What's your Password?</label>
          <input
            type="password"
            placeholder="password"
            value={formData.password}
            name="password"
            onChange={handleUser}
            className="border border-gray-300 bg-gray-200 mt-2 mb-4 p-2 rounded w-full text-lg"
            required
          />

          {Array.isArray(error) && error.map(er => <p className="text-red-500 text-sm mb-4">{er.msg}</p>)}
          { typeof error === 'string' && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button type="submit" disabled={loading} className="text-center text-xl w-full bg-black text-white py-3 rounded mt-4">
            {loading ? "Creating Account" : "Sign up"}
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
