package com.example.gosyippee.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.gosyippee.config.TokenProvider;
import com.example.gosyippee.exception.UserException;
import com.example.gosyippee.model.User;
import com.example.gosyippee.repository.UserRepository;
import com.example.gosyippee.request.LoginRequest;
import com.example.gosyippee.response.AuthResponse;
import com.example.gosyippee.service.CustomUserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private TokenProvider tokenProvider;
    private CustomUserService customUserService;
     
    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, TokenProvider tokenProvider, CustomUserService customUserService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.customUserService = customUserService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException {
    	System.out.println("Trace 1 ");
        String email = user.getEmail();
        String full_name = user.getFull_name();
        String password = user.getPassword();
        System.out.println("Trace 2 ");
        User isUser = userRepository.findByEmail(email);
        System.out.println("Trace 3 ");
        if(isUser != null){
            throw new UserException("Email is with another account " + email);
        }
        System.out.println("Trace 4 ");

        User createdUser = new User();
        createdUser.setEmail(email);
        createdUser.setFull_name(full_name);
        createdUser.setPassword(passwordEncoder.encode(password));
        System.out.println("Trace 5 ");
        userRepository.save(createdUser);
        System.out.println("Trace 6 ");
        Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        System.out.println("Trace 7 ");

        String jwt = tokenProvider.generateToken(authentication);
        System.out.println("Trace 8 ");

        AuthResponse res = new AuthResponse(jwt, true);
        System.out.println("Response: " + res);
        System.out.println("Trace 9 ");

        return new ResponseEntity<AuthResponse>(res, HttpStatus.ACCEPTED);
    }
    
    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> loginHandler(@RequestBody LoginRequest req) {
        String email = req.getEmail();
        String password = req.getPassword();

        Authentication authentication = authenticate(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        AuthResponse res = new AuthResponse(jwt, true);
        
        return new ResponseEntity<AuthResponse>(res, HttpStatus.ACCEPTED);
    }

    public Authentication authenticate(String username, String password){
        UserDetails userDetails = customUserService.loadUserByUsername(username);

        if(userDetails == null){
            throw new BadCredentialsException("Invalid username");
        }

        if(!passwordEncoder.matches(password, userDetails.getPassword())){
            throw new BadCredentialsException("Invalid username or password");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
