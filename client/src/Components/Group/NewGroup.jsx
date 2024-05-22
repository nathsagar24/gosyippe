import { CircularProgress } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { Button } from '@mui/material';
import { BsCheck2 } from 'react-icons/bs';

const NewGroup = () => {
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [groupName, setGroupName] = useState();
    return (
    <div className='w-full h-full'>
        <div className='flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5'>
            <BsArrowLeft className="cursor-pointer text-2xl font-bold"/>
            <p className='text-xl font-semibold'>New Group</p>
        </div>

        <div className='flex flex-col justify-center items-center my-12'>
            <label htmlFor='imgInput' className='relative'>
                <img src="https://cdn.pixabay.com/photo/2024/04/11/14/55/friends-8689997_640.png" alt=""/>
                {isImageUploading && <CircularProgress className='absolute top-[5rem] left-[6rem]'/>}
            </label>
            <input
            type='file'
            id='ImgInput'
            className='hidden'
            onChange={()=>console.log("imageOnChange")}
            />
        </div>
        {groupName && (<div>
            <Button>
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