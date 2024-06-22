import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiEndpoint = 'register';

  constructor(private apiService: ApiService) { }

  registerUser(formData: FormData): Observable<any> {
    return this.apiService.postFormData<any>(this.apiEndpoint, formData);
  }
}
