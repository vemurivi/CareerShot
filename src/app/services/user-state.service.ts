import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private userProfileSubject = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject.asObservable();

  setUserProfile(userProfile: any): void {
    this.userProfileSubject.next(userProfile);
  }

  getUserProfile(): any {
    return this.userProfileSubject.getValue();
  }
}
