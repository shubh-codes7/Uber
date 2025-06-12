import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'
import { toast } from 'react-toastify'

const Captainlogin = () => {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()



  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    setError(false)

    try{

    const captain = {
      email: email,
      password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captain, {withCredentials: true})
    setCaptain(response.data.captain);
    localStorage.setItem('captainToken', response.data.token);
    toast.success("Captain Logged in!")
    setEmail('')
    setPassword('')
    setLoading(false)
    navigate('/captain-home')

    }catch(err){
      console.log(err)
      toast.error(err?.response?.data?.message)
      setError(err?.response?.data?.message)
    }finally{
      setLoading(false)
    }

  }
  return (
    <div className='p-7 h-svh flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required type="password"
            placeholder='password'
          />

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          
          <button disabled={loading} className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>{loading ? "Logging in" : "Login"}</button>

        </form>
        <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
      </div>
      <div>
        <Link
          to='/login'
          className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as User</Link>
      </div>
    </div>
  )
}

export default Captainlogin