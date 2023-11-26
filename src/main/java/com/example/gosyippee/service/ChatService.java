package com.example.gosyippee.service;

import java.util.List;

import com.example.gosyippee.exception.ChatException;
import com.example.gosyippee.exception.UserException;
import com.example.gosyippee.model.Chat;
import com.example.gosyippee.model.User;
import com.example.gosyippee.request.GroupChatRequest;

public interface ChatService {
    
    public Chat createChat(User reqUser, Integer userId2) throws UserException;

    public Chat findChatById(Integer chatId) throws ChatException;

    public List<Chat> findAllChatByUserId(Integer userId) throws UserException;

    public Chat createGroup(GroupChatRequest req, User reqUser) throws UserException;

    public Chat addUserToGroup(Integer userId, Integer chatId, User reqUser) throws UserException, ChatException;

    public Chat renameGroup(Integer chatId, String groupName, User reqUser) throws ChatException, UserException;
    
    public Chat removeFromGroup(Integer chatId, Integer userId, User reqUser) throws UserException, ChatException;

    public void deleteChat(Integer chatId, Integer userId) throws UserException, ChatException;

}
