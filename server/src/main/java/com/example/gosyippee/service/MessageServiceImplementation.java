package com.example.gosyippee.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.gosyippee.exception.ChatException;
import com.example.gosyippee.exception.MessageException;
import com.example.gosyippee.exception.UserException;
import com.example.gosyippee.model.Chat;
import com.example.gosyippee.model.Message;
import com.example.gosyippee.model.User;
import com.example.gosyippee.repository.MessageRepository;
import com.example.gosyippee.request.SendMessageRequest;

@Service
public class MessageServiceImplementation implements MessageService {
    
    private MessageRepository messageRepository;
    private UserService userService;
    private ChatService chatService;
    
    public MessageServiceImplementation(MessageRepository messageRepository, UserService userService,
            ChatService chatService) {
        this.messageRepository = messageRepository;
        this.userService = userService;
        this.chatService = chatService;
    }

    @Override
    public void deleteMessage(Integer messageId, User reqUser) throws MessageException {
        
        Message message = findMessageById(messageId);
        
        if(message.getUser().getId().equals(reqUser.getId())){
            messageRepository.deleteById(messageId);
        }
        
        throw new MessageException("you can't delete another user's message " + reqUser.getFull_name());
    }

    @Override
    public Message findMessageById(Integer messageId) throws MessageException {
        Optional<Message> opt = messageRepository.findById(messageId);
        if(opt.isPresent()){
            Message message = opt.get();
            return message;
        }

        throw new MessageException("message not found with id " + messageId);
    }

    @Override
    public List<Message> getChatsMessages(Integer chatId, User reqUser) throws ChatException, UserException {
        Chat chat = chatService.findChatById(chatId);
        if(!chat.getUsers().contains(reqUser)) {
            throw new UserException("You are not related to this chat " + chatId);
        }
        List<Message> messages = messageRepository.findByChatId(chat.getId());
        return messages;
    }

    @Override
    public Message sendMessage(SendMessageRequest req) throws UserException, ChatException {
        User user = userService.findUserById(req.getUserId());
        Chat chat = chatService.findChatById(req.getChatId());

        Message message = new Message();
        message.setChat(chat);
        message.setUser(user);
        message.setContent(req.getContent());
        message.setTimeStamp(LocalDateTime.now());
        
        return message;
    }

    

}
