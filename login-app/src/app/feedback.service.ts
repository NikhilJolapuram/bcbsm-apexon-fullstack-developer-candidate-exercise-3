// feedback.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private apiUrl = 'http://your-api-url/feedback'; // replace with your API URL

  constructor(private http: HttpClient) { }

  getFeedback(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
