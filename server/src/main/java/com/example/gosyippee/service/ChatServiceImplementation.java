package com.example.gosyippee.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.gosyippee.exception.ChatException;
import com.example.gosyippee.exception.UserException;
import com.example.gosyippee.model.Chat;
import com.example.gosyippee.model.User;
import com.example.gosyippee.repository.ChatRepository;
import com.example.gosyippee.request.GroupChatRequest;

@Service
public class ChatServiceImplementation implements ChatService {

    private ChatRepository chatRepository;
    private UserService userService;
    

    public ChatServiceImplementation(ChatRepository chatRepository, UserService userService) {
        this.chatRepository = chatRepository;
        this.userService    = userService;
    }

    @Override
    public Chat addUserToGroup(Integer userId, Integer chatId, User reqUser) throws UserException, ChatException {
        Optional<Chat> opt = chatRepository.findById(chatId);
        User user = userService.findUserById(userId);

        if(opt.isPresent()){
            Chat chat = opt.get();
            if(chat.getAdmins().contains(reqUser)){
                chat.getUsers().add(user);
                return chatRepository.save(chat);
            }
            else {
                throw new UserException("You are not admin");
            }
        }
        throw new ChatException("chat not found with id " + chatId);
    }

    @Override
    public Chat createChat(User reqUser, Integer userId2) throws UserException {
        User user = userService.findUserById(userId2);

        Chat isChatExist = chatRepository.findSingleChatByUserIds(user, reqUser);
        
        if(isChatExist != null) {
            return isChatExist;
        }

        Chat chat = new Chat();
        chat.setCreatedBy(reqUser);
        chat.setGroup(false);
        chat.getUsers().add(reqUser);
        chat.getUsers().add(user);

        return chatRepository.save(chat);
    }

    @Override
    public Chat createGroup(GroupChatRequest req, User reqUser) throws UserException {
        Chat group = new Chat();
        group.setGroup(true);
        group.getAdmins().add(reqUser);
        group.setChat_name(req.getChat_name());
        group.setChat_image(req.getChat_image());
        group.setCreatedBy(reqUser);

        for (Integer userId:req.getUserIds()){
            User user = userService.findUserById(userId);
            group.getUsers().add(user);
        }

        return chatRepository.save(group);
    }

    @Override
    public void deleteChat(Integer chatId, Integer userId) throws UserException, ChatException {

        Optional<Chat> opt = chatRepository.findById(chatId);

        if(opt.isPresent()){
            Chat chat = opt.get();
            chatRepository.deleteById(chat.getId());
        }
        
        
    }

    @Override
    public List<Chat> findAllChatByUserId(Integer userId) throws UserException {
        User user = userService.findUserById(userId);
        List<Chat> chats = chatRepository.findChatByUserId(user.getId());
        return chats;
    }

    @Override
    public Chat findChatById(Integer chatId) throws ChatException {
        Optional<Chat> opt = chatRepository.findById(chatId);
        
        if(opt.isPresent()){
            Chat chat = opt.get();
            return chat;
        }

        throw new ChatException("Chat not found with id " + chatId);
    }

    @Override
    public Chat removeFromGroup(Integer chatId, Integer userId, User reqUser) throws UserException, ChatException {
        
        Optional<Chat> opt = chatRepository.findById(chatId);
        User user = userService.findUserById(userId);

        if(opt.isPresent()){
            Chat chat = opt.get();
            if(chat.getAdmins().contains(reqUser)) {
                chat.getUsers().remove(user);
                return chatRepository.save(chat);
            }
            else if (chat.getUsers().contains(reqUser)) {
                if(user.getId().equals(reqUser.getId())) {
                    chat.getUsers().remove(user);
                    return chatRepository.save(chat);
                }
            }
            throw new UserException("you can't remove another user");
        }

        throw new ChatException("chat not found with id " + chatId);
    }

    @Override
    public Chat renameGroup(Integer chatId, String groupName, User reqUser) throws ChatException, UserException {
        
        Optional<Chat> opt = chatRepository.findById(chatId);

        if(opt.isPresent()){
            Chat chat = opt.get();
            if(chat.getUsers().contains(reqUser)){
                chat.setChat_name(groupName);
                return chatRepository.save(chat);
            }

            throw new UserException("You are not member of this group");
        }

        throw new ChatException("Chat not found with id " + chatId);
    }

   
    
}
