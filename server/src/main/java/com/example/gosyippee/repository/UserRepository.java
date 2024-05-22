package com.example.gosyippee.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.gosyippee.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    
    public User findByEmail(String email);

    @Query("select u from User u where u.full_name Like %:query% or u.email Like %:query%")
    public List<User> searchUser(String query);
}
