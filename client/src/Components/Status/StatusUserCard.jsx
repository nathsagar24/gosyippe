import React from 'react'
import { useNavigate } from 'react-router-dom';

const StatusUserCard = () => {
const navigate = useNavigate();
const handleNavigate = () => {
    navigate(`/status/{userId}`)
}
  return (
    <div onClick={handleNavigate} className='flex items-center p-3'>
        <div>
            <img className='h-7 w-7 lg:w-10 lg:h-10 rounded-full' src='https://cdn.pixabay.com/photo/2021/07/24/07/23/chow-chow-6488846_1280.jpg' alt=''/>
        </div>
        <div className='ml-2 text-white'>
            <p>Sagar Nath</p>
        </div>
    </div>
  )
}

export default StatusUserCard