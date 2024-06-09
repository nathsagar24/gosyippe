import React from 'react'
import { BsArrowLeft, BsCheck2, BsPencil } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../Redux/Auth/Action';

const Profile = ({handleCloseOpenProfile}) => {
  const [flag, setFlag] = useState(false);
  const [username, setUsername] = useState("");
  const { auth } = useSelector(store=>store);
  const dispatch = useDispatch();

  const handleFlag = () => {
    setFlag(true);
  }
  const handleChange = (e) => {
    setUsername(e.target.value);
  }

  const handleUpdateName = (e) => {
    const data = {
      id: auth.reqUser?.id,
      token: localStorage.getItem("token"),
      data: { full_name: username }
    }
    if(e.target.key==="Enter") {
      dispatch(updateUser(data))
    }
  }
  const handleCheckClick = () => {
    setFlag(false);
    const data = {
      id: auth.reqUser?.id,
      token: localStorage.getItem("token"),
      data: { full_name: username }
    }
    if(e.target.key==="Enter") {
      dispatch(updateUser(data))
    }
  }

  const uploadToCloudnary = (pics) => {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "gosyippe");
    data.append("cloud_name", "dfgtkcny3")
    fetch("https://api.cloudinary.com/v1_1/dfgtkcny3/image/upload", {
      method: "post",
      body: data,
    })
    .then((res) => res.json())
    .then((data) => {
      setTempPicture(data.url.toString());
      // setMessage("profile image uploaded successfully");
      // setOpen(true);
      console.log("imgurl", data.url.toString());
      const data = {
        id: auth.reqUser.id,
        token: localStorage.getItem("token"),
        data: { profile_picture: data.url.toString() },
      };
      dispatch(updateUser(data));
    });
  }

  return (
    <div className='h-full w-full'>
        <div className='flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5'>
            <BsArrowLeft className='cursor-pointer text-2xl font-bold' onClick={handleCloseOpenProfile}/>
            <p className='cursor-pointer font-semibold'>Profile</p>
        </div>
        {/* update profile pic section */}
        <div className='flex flex-col justify-center items-center my-12'>
            <label htmlFor='imgInput'>
                <img className='rounded-full w-[15vw] h-[15vw] cursor-pointer' src={auth.reqUser?.profile_picture || tempPicture || 'https://cdn.pixabay.com/photo/2020/10/22/10/28/cow-5675684_960_720.jpg'} alt=''/>
            </label>
            <input onChange={(e)=>uploadToCloudnary(e.target.files[0])} type='file' id='imgInput' className='hidden'/>
        </div>
        {/* name section */}
        <div className='bg-white px-3'>
            <p className='py-3'>Your Name</p>
            {!flag && <div className='w-f11 flex justify-between items-center'>
                <p className='py-3'>{auth.reqUser.full_name || "username"}</p>
                <BsPencil onClick={handleFlag} className='cursor-pointer'/>
            </div>}
            {flag && <div className='w-full flex justify-between items-center py-2'>
                    <input onKeyPress={handleUpdateName} onChange={handleChange} className='w-[80%] outline-none border-b-2 border-blue-700 p-2' type="text" placeholder='Enter your Name'/>
                    <BsCheck2 onClick={handleCheckClick} className='cursor-pointer text-2xl'/>
                </div>}
        </div>
        <div className='px-3 my-5'>
            <p className='py-10'>
                this is not your username, this name will be visible to your gosyippe contacts.
            </p>
        </div>
    </div>
  )
}

export default Profile