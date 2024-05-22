import React, { useEffect } from 'react'
import { useState } from 'react';
import { stories } from './DummyStory';
import ProgressBar from './ProgressBar';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';

const StatusViewer = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(-1);
  }
  const handleNextStory = () => {
    if(currentStoryIndex < stories?.length-1){
        setCurrentStoryIndex(currentStoryIndex+1);
        setActiveIndex(activeIndex+1);
    }
    else{
        setCurrentStoryIndex(0);
        setActiveIndex(0);
    }
  }

  useEffect(()=>{
    const intervalId = setInterval(()=>{
        handleNextStory()
    }, 2000)
    return ()=>clearInterval(intervalId);
  }, [currentStoryIndex])

  return (
    <div>
        <div className='flex justify-center items-center h-[100vh] bg-slate-900'>
            <div className='relative'>
                <img className='max-h-[96vh] object-contain' src={stories?.[currentStoryIndex].image} alt=""/>
                <div className='absolute top-0 flex w-full'>
                    {stories.map((item, index)=><ProgressBar key={index} duration={2000} index={index} activeIndex={activeIndex}/>)}
                </div>
             </div>
             <div>
                <BsArrowLeft onClick={handleNavigate} className='text-white text-2xl cursor-pointer absolute top-0 left-10'/>
                <AiOutlineClose onClick={handleNavigate} className='text-white text-2xl cursor-pointer absolute top-0 right-10'/>
             </div>
        </div>
    </div>
  )
}

export default StatusViewer