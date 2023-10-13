package com.example.mylogin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.mylogin.model.Feedback;

@Repository
public interface FeedBackRepository extends JpaRepository<Feedback, Long>{
	
	// Custom query to retrieve feedback by username
    @Query("SELECT f FROM Feedback f WHERE f.user.username = :username")
    List<Feedback> findFeedbacksByUserUsername(@Param("username") String username);
    Feedback save(Feedback feedback);
    
}
