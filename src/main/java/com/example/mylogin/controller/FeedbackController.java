package com.example.mylogin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.mylogin.model.Feedback;
import com.example.mylogin.model.User;
import com.example.mylogin.repository.FeedBackRepository;
import com.example.mylogin.repository.UserRepository;

@RestController
@RequestMapping("/api/user/")
public class FeedbackController {

	@Autowired
	private FeedBackRepository feedbackRepository;
	private UserRepository userRepository;
	
	@GetMapping("/admin/feedback")
	public List<Feedback> getAllUserFeedback() {
		return (List<Feedback>) feedbackRepository.findAll();
	}
	
	@GetMapping("/feedback/{username}")
	public List<Feedback> getFeedbackByUserUsername(@PathVariable String username) {
	    return feedbackRepository.findFeedbacksByUserUsername(username);
	}
	
	 @PostMapping("/feedback/{username}")
	    public Feedback submitFeedbackForUser(
	        @PathVariable String username,
	        @RequestBody Feedback feedback
	    ) {
	        // Retrieve the user from the database using the username
	        User user = userRepository.findByUsername(username);
	        
	        if (user == null) {
	            // Handle the case where the user with the specified username doesn't exist
	            // You can return an error response or handle it according to your needs.
	            // For simplicity, we'll return null here.
	            return null;
	        }
	        
	        // Associate the user with the feedback
	        feedback.setUser(user);
	        
	        // Save the feedback to the database
	        return feedbackRepository.save(feedback);
	    }
	
}
