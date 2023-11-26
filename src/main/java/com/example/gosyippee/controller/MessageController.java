package com.example.gosyippee.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.gosyippee.exception.ChatException;
import com.example.gosyippee.exception.MessageException;
import com.example.gosyippee.exception.UserException;
import com.example.gosyippee.model.Message;
import com.example.gosyippee.model.User;
import com.example.gosyippee.request.SendMessageRequest;
import com.example.gosyippee.response.ApiResponse;
import com.example.gosyippee.service.MessageService;
import com.example.gosyippee.service.UserService;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    
    private MessageService messageService;
    private UserService userService;
    
    public MessageController(MessageService messageService, UserService userService) {
        this.messageService = messageService;
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<Message> sendMessageHandler(SendMessageRequest req, @RequestHeader("Authorization") String jwt) throws UserException, ChatException {

        User user = userService.findUserProfile(jwt);

        req.setUserId(user.getId());
        Message message = messageService.sendMessage(req);

        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/chat/{chatId}")
    public ResponseEntity<List<Message>> getChatsMessagesHandler(@PathVariable Integer chatId, @RequestHeader("Authorization") String jwt) throws UserException, ChatException{
        User user = userService.findUserProfile(jwt);

        List<Message> messages = messageService.getChatsMessages(chatId, user);

        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    @DeleteMapping("/{messageId}")
    public ResponseEntity<ApiResponse> deleteMessageHandler(@PathVariable Integer messageId, @RequestHeader("Authorization") String jwt) throws MessageException, UserException{
        User user = userService.findUserProfile(jwt);

        messageService.deleteMessage(messageId, user);

        ApiResponse res = new ApiResponse("message deleted successfully", true);

        return new ResponseEntity<ApiResponse>(res, HttpStatus.OK);
    }

    
}
