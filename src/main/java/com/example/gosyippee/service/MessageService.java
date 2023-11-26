package com.example.gosyippee.service;

import java.util.List;

import com.example.gosyippee.exception.ChatException;
import com.example.gosyippee.exception.MessageException;
import com.example.gosyippee.exception.UserException;
import com.example.gosyippee.model.Message;
import com.example.gosyippee.model.User;
import com.example.gosyippee.request.SendMessageRequest;

public interface MessageService {
   
    public Message sendMessage(SendMessageRequest req) throws UserException, ChatException;
    public List<Message> getChatsMessages(Integer chatId, User reqUser) throws ChatException, UserException;
    public Message findMessageById(Integer messageId) throws MessageException;
    public void deleteMessage(Integer messageId, User reqUser) throws MessageException;
}
