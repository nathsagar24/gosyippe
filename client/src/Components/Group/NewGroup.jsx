import { Avatar, CircularProgress } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { Button } from '@mui/material';
import { BsCheck2 } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { createGroupChat } from '../../Redux/Chat/Action';
import CreateGroup from './CreateGroup';

const NewGroup = ({setIsGroup, groupMember}) => {
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [groupImage, setGroupImage] = useState(null);
    const [groupName, setGroupName] = useState();
    const token=localStorage.getItem("token");
    const dispatch = useDispatch();

    const uploadToCloudnary = (pics) => {
        setIsImageUploading(true);
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
          setGroupImage(data.url.toString());
          setIsImageUploading(false);
        });
      }

    const handleCreateGroup = () => {
        let userIds=[];
        for(let user of groupMember) {
            userIds.push(user.id);
        }
        const group = {
            userIds,
            chat_name: groupName,
            chat_image: groupImage
        };
        const data={
            group,
            token
        };
        dispatch(createGroupChat(data));
        setIsGroup(false);
    }

    return (
    <div className='w-full h-full'>
        <div className='flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5'>
            <BsArrowLeft className="cursor-pointer text-2xl font-bold"/>
            <p className='text-xl font-semibold'>New Group</p>
        </div>

        <div className='flex flex-col justify-center items-center my-12'>
            <label htmlFor='imgInput' className='relative'>
                {/* <img src={groupImage || "https://cdn.pixabay.com/photo/2024/04/11/14/55/friends-8689997_640.png"} alt=""/> */}
                <Avatar sx={{width:"15rem", height:"15rem"}} alt="group icon" src={groupImage || "https://cdn.pixabay.com/photo/2024/04/11/14/55/friends-8689997_640.png"}/>
                {isImageUploading && <CircularProgress className='absolute top-[5rem] left-[6rem]'/>}
            </label>
            <input
            type='file'
            id='imgInput'
            className='hidden'
            onChange={(e)=>uploadToCloudnary(e.target.files[0])}
            />
        </div>
        {groupName && (<div>
            <Button onClick={handleCreateGroup}>
                {" "}
                <div className='bg-[#0c977d] rounded-full p-4'>
                    <BsCheck2 className='text-white font-bold text-3xl'/>
                </div>{" "}
            </Button>
        </div>)}
    </div>
  );
}

export default NewGroup;