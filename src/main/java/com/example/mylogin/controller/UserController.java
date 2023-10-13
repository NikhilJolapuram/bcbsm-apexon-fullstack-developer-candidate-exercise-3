package com.example.mylogin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.example.mylogin.repository.UserRepository;
import com.example.mylogin.model.User;

@RestController
@RequestMapping("/api/user/")
public class UserController {

	@Autowired
	private UserRepository userRepository;
	   
	@Autowired
	private UserDetailsService userDetailsService;
	
	@SuppressWarnings("unchecked")
	@GetMapping("/login1")
	public List<User> getUser(String userName) {
		return (List<User>) userRepository.findByUsername(userName);	
	}
	
	@GetMapping("/login")
	public List<User> getAllUser() {
		return (List<User>) userRepository.findAll();
	}
}
