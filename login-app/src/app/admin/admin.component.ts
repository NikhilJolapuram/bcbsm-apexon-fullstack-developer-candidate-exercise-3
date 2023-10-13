import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../feedback.service';
import { Feedback } from '../feedback.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private feedbackService: FeedbackService) { }


  feedbackList: Feedback[] = [];

  ngOnInit(): void {
    this.feedbackService.getFeedback().subscribe((data: any[])=>{
      console.log(data);
      this.feedbackList = data;
    })  
  }
}
