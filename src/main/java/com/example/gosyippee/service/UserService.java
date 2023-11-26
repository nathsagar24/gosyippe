package com.example.gosyippee.service;

import java.util.List;

import com.example.gosyippee.exception.UserException;
import com.example.gosyippee.model.User;
import com.example.gosyippee.request.UpdateUserRequest;

public interface UserService {

    public User findUserById(Integer id) throws UserException;

    public User findUserProfile(String jwt) throws UserException;

    public User updateUser(Integer userId, UpdateUserRequest req) throws UserException;

    public List<User> searchUser(String query);
    
}
