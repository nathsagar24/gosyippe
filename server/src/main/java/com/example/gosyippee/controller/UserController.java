package com.example.gosyippee.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.gosyippee.exception.UserException;
import com.example.gosyippee.model.User;
import com.example.gosyippee.request.UpdateUserRequest;
import com.example.gosyippee.response.ApiResponse;
import com.example.gosyippee.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfileHandler(@RequestHeader("Authorizaton") String token) throws UserException {
        User user = userService.findUserProfile(token);
        return new ResponseEntity<User>(user, HttpStatus.ACCEPTED);
    }

    @GetMapping("/{query}")
    public ResponseEntity<List<User>> searchUserHandler(@PathVariable("query") String q){
        List<User> users = userService.searchUser(q);
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse> updateUserHandler(@RequestBody UpdateUserRequest req, @RequestHeader("Authorization") String token) throws UserException {
        
        User user = userService.findUserProfile(token);
        userService.updateUser(user.getId(), req);

        ApiResponse res = new ApiResponse("User updated successfully", true);

        return new ResponseEntity<ApiResponse>(res, HttpStatus.ACCEPTED);

    }
    
}
