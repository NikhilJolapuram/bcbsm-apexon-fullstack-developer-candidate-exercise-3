import { Component } from '@angular/core';
import { SharedDataService } from './shared-data.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  model = {
    rating: '',
    comment: ''
  };

  loginData: any; // Define a variable to hold the login data
  feedbackData: any; // Define a variable to hold the feedback data

  constructor(private sharedDataService: SharedDataService,  private http: HttpClient) {}

ngOnInit() {
  // Retrieve the login data from the shared service
  this.loginData = this.sharedDataService.getLoginData();

  // Now you can use this.loginData to access the login data in your feedback component
}

onSubmit() {
  // Handle form submission here
  console.log(this.model);

  // Prepare the feedback data
  const feedbackData = {
    rating: this.model.rating,
    comment: this.model.comment,
  };

  // Get the username from the login data
  const username = this.loginData.username;

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // Send the feedback data to the server using an HTTP POST request
  this.http.post(`/api/user/feedback/${username}`, feedbackData, httpOptions).subscribe(
    (response) => {
      // Handle the successful submission (e.g., show a success message)
      console.log('Feedback submitted successfully', response);

      // Optionally, you can clear the form inputs after successful submission
      this.model.rating = '';
      this.model.comment = '';
    },
    (error) => {
      // Handle the error (e.g., show an error message)
      console.error('Error submitting feedback', error);
    }
  );
}

  getfeedback() {
    const username = this.loginData.username;

    if (username === 'admin') {
      this.http.get('/api/user/admin/feedback').subscribe(
        (response) => {
          this.feedbackData = response;
          console.log('Feedback data:', this.feedbackData);
        },
        (error) => {
          console.error('Error getting feedback:', error);
        }
      );
    } else {
      // For non-admin users, retrieve feedback based on their username
      this.http.get(`/api/user/feedback/${username}`).subscribe(
        (response) => {
          this.feedbackData = response;
          console.log('Feedback data:', this.feedbackData);
        },
        (error) => {
          console.error('Error getting feedback:', error);
        }
      );
    }

  }
}
