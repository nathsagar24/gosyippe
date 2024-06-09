import React, { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import {
  BsEmojiSmile,
  BsFilter,
  BsMicFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { TbCircleDashed } from "react-icons/tb";
import ChatCard from "./ChatCard/ChatCard";
import MessageCard from "./MessageCard/MessageCard";
import { useState } from "react";
import "./HomePage.css";
import Profile from "./Profile/Profile";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, createChainedFunction } from "@mui/material";
import CreateGroup from "./Group/CreateGroup";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../Redux/store";
import { currentUser, logoutAction, searchUser } from "../Redux/Auth/Action";
import { createChat, getUsersChat } from "../Redux/Chat/Action";
import { createMessage, getAllMessages } from "../Redux/Message/Action";

const HomePage = () => {
  const [querys, setQuerys] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [content, setContent] = useState(null);
  const [isProfile, setIsProfile] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isGroup, setIsGroup] = useState(false);
  const dispatch = useDispatch();
  const { auth, chat, message } = useSelector(store=>store);
  const token = localStorage.getItem("token");

  const open = anchorEl;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (keyword) => {
    dispatch(searchUser(keyword, token));
  };
  const handleClickOnChatCard = (userId) => {
    // setCurrentChat(true);
    dispatch(createChat({token, data:{userId}}))
    setQuerys("");
  };
  const handleCreateNewMessage = () => {
    dispatch(createMessage({token, data:{chatId: currentChat.id, content: content}}))
    console.log("create new message")
  };

  useEffect(()=>{
    dispatch(getUsersChat({token}))
  }, [chat.createdChat, chat.createdGroup]);

  useEffect(()=>{
    if(currentChat?.id){
      dispatch(getAllMessages({chatId: currentChat.id, token}))
    }
  }, [currentChat, message.newMessage]);

  const handleNavigate = () => {
    setIsProfile(true);
  };
  const handleCloseOpenProfile = () => {
    setIsProfile(false);
  };
  const handleCreateGroup = () => {
    setIsGroup(true);
  }
  const handleLogout = () => {
    dispatch(logoutAction())
    navigate("/signup")
  }

  const handleCurrentChat = (item) => {
    setCurrentChat(item);
  }

  useEffect(()=>{
    dispatch(currentUser(token))
  }, [token])

  useEffect(()=>{
    if(!auth.reqUser){
      navigate("/signup")
    }
  },[auth.reqUser])

  return (
    <div className="relative">
      <div className="w-full py-14 bg-[#00a884]"></div>
      <div className="flex bg-[#f0f2f5] h-[90vh] absolute left-[2vw] top-[5vh] w-[96vw]">
        <div className="left w-[30%] bg-[#e8e9ec] h-full">
          {/* profile */}
          {isGroup && <CreateGroup setIsGroup={setIsGroup}/>}
          {isProfile && (
            <Profile
              className="w-full h-full"
              handleCloseOpenProfile={handleCloseOpenProfile}
            />
          )}
          {/* home */}
          {!isProfile && !isGroup && (
            <div className="w-full">
              <div className="flex justify-between items-center p-3">
                <div
                  className="flex items-center space-x-3"
                  onClick={handleNavigate}
                >
                  <img
                    className="rounded-full w-10 h-10 cursor-pointer"
                    src={auth.reqUser?.profile_picture || "https://cdn.pixabay.com/photo/2020/10/22/10/28/cow-5675684_960_720.jpg"}
                    alt=""
                  />
                  <p>{auth.reqUser?.full_name}</p>
                </div>
                <div className="space-x-3 text-2xl flex">
                  <TbCircleDashed
                    className="cursor-pointer"
                    onClick={() => navigate("/status")}
                  />
                  <BiCommentDetail />
                  <BsThreeDotsVertical
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  />
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleCreateGroup}>Create Group</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </div>
              </div>
              <div className="relative flex justify-center items-center bg-white py-4 px-3">
                <input
                  className="border-none outline-none bg-slate-200  rounded-md w-[93%] pl-9 py-2"
                  type="text"
                  placeholder="Search or start new Chat"
                  onChange={(e) => {
                    setQuerys(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  value={querys}
                />
                <AiOutlineSearch className="left-5 top-7 absolute" />
                <div>
                  <BsFilter className="ml-4 text-3xl" />
                </div>
              </div>
              {/* all users */}
              <div className="bg-white overflow-y-scroll h-[72vh] px-3">
                {querys &&
                  auth.searchUser?.map((item) => (
                    <div onClick={() => handleClickOnChatCard(item.id)}>
                      <hr />
                      <ChatCard 
                      name={item.chat_name}
                      userImg={
                        item.chat_image || 
                        "https://cdn.pixabay.com/photo/2021/09/29/22/59/viola-6668608_640.jpg"
                      }/>
                    </div>
                  ))}
                {chat.chats.length>0 && !querys &&
                  chat.chats?.map((item) => (
                    <div onClick={() => handleCurrentChat(item)}>
                      <hr /> {item.is_group ? (
                        <ChatCard
                        name={item.chat_name}
                        userImg={
                          item.chat_image || 
                          "https://cdn.pixabay.com/photo/2014/09/28/10/36/group-464644_640.jpg"
                        }
                        />
                      ) : (
                        <ChatCard
                        isChat={true}
                        name={
                          auth.reqUser?.id !== item.users[0]?.id
                          ? item.users[0].full_name
                          : item.users[1].full_name
                        }
                        userImg={
                          auth.reqUser.id !== item.users[0].id
                          ? item.users[0].profile_picture || 
                          "https://cdn.pixabay.com/photo/2021/09/29/22/59/viola-6668608_640.jpg"
                          : item.users[1].profile_picture || 
                          "https://cdn.pixabay.com/photo/2021/09/29/22/59/viola-6668608_640.jpg"
                        }
                        />
                      ) }
                      
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
        {/* default page */}
        {!currentChat && (
          <div className="w-[70%] flex flex-col items-center justify-center h-full">
            <div className="max-w-[70%] text-center">
              <img
                src="https://cdn.pixabay.com/photo/2022/12/01/13/28/leaf-7629114_640.jpg"
                alt=""
              />
            </div>
          </div>
        )}
        {/* message part */}
        {currentChat && (
          <div className="w-[70%] relative bg-blue-200">
            <div className="header absolute top-0 w-full bg-[#f0f2f5]">
              <div className="flex justify-between">
                <div className="py-3 space-x-4 flex items-center px-3">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={currentChat.is_group?currentChat.chat_image || "https://cdn.pixabay.com/photo/2014/09/28/10/36/group-464644_640.jpg" : (
                        auth.reqUser.id !== currentChat.users[0].id
                        ? currentChat.users[0].profile_picture || 
                        "https://cdn.pixabay.com/photo/2021/09/29/22/59/viola-6668608_640.jpg"
                        : currentChat.users[1].profile_picture || 
                        "https://cdn.pixabay.com/photo/2021/09/29/22/59/viola-6668608_640.jpg")
                    }
                    alt=""
                  />
                  <p>{currentChat.is_group? currentChat.chat_name: auth.reqUser?.id === currentChat.users[0].id?currentChat.users[1].full_name:currentChat.users[0].full_name}</p>
                </div>
                <div className="py-3 flex space-x-4 items-center px-3">
                  <AiOutlineSearch />
                  <BsThreeDotsVertical />
                </div>
              </div>
            </div>

            {/* message section */}
            <div className="px-10 h-[85vh] overflow-y-scroll">
              <div className="space-y-1 flex flex-col justify-center mt-20 py-2">
                {message.messages.length>0 && message.messages?.map((item, i) => (
                  <MessageCard
                    isReqUserMessage={item.user.id!==auth.reqUser.id}
                    content={item.content}
                  />
                ))}
              </div>
            </div>

            {/* footer part */}
            <div className="footer bg-[#f0f2f5] absolute bottom-0 w-full py-3 text-2xl">
              <div className="flex justify-between items-center px-5 relative">
                <BsEmojiSmile className="cursor-pointer" />
                <ImAttachment />

                <input
                  className="py-2 outline-none border-none bg-white pl-4 rounded-md w-[85%]"
                  type="text"
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Type message"
                  value={content}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      handleCreateNewMessage();
                      setContent("");
                    }
                  }}
                />
                <BsMicFill />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
