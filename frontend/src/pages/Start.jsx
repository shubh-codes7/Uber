import uberLogo from '../assets/uber_logo.png'
import {Link} from 'react-router-dom'

const Start = () => {
  return (
    <div className=" bg-green-200 h-screen w-full pt-8 flex flex-col justify-between">
      <img className='w-16 ml-8' src={uberLogo}/>
      <div className='bg-white py-5 px-10'>
        <h2 className='text-center text-3xl font-bold'>Get started with Uber</h2>
        <Link to='/login' className='inline-block text-center text-lg w-full bg-black text-white py-3 rounded mt-4'>Continue</Link>
      </div>
    </div>
  )
}

export default Start
