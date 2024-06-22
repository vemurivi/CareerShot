import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private getUrl = 'https://careershotapp.azurewebsites.net/api';
  private postUrl = 'https://careershotappwrite.azurewebsites.net/api';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private userStateService: UserStateService
  ) {}

  // Common method for GET requests
  get<T>(endpoint: string): Observable<T> {
    return this.tokenService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        return this.http.get<T>(`${this.getUrl}/${endpoint}`, { headers }).pipe(
          tap(data => {
              this.userStateService.setUserProfile(data);
          }),
          catchError(error => this.handleAuthError<T>(error, () => this.http.get<T>(`${this.getUrl}/${endpoint}`, { headers })))
        );
      })
    );
  }

  // Common method for POST requests
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.tokenService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
        return this.http.post<T>(`${this.postUrl}/${endpoint}`, data, { headers }).pipe(
          tap(response => {
              this.userStateService.setUserProfile(response);
          }),
          catchError(error => this.handleAuthError<T>(error, () => this.http.post<T>(`${this.postUrl}/${endpoint}`, data, { headers })))
        );
      })
    );
  }

  // Common method for POST requests with form data
  postFormData<T>(endpoint: string, formData: FormData): Observable<T> {
    return this.tokenService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        return this.http.post<T>(`${this.postUrl}/${endpoint}`, formData, { headers }).pipe(
          tap(response => {
            if (endpoint === 'user-profile-endpoint') {
              this.userStateService.setUserProfile(response);
            }
          }),
          catchError(error => this.handleAuthError<T>(error, () => this.http.post<T>(`${this.postUrl}/${endpoint}`, formData, { headers })))
        );
      })
    );
  }

  // Handle authentication errors and retry with a new token if necessary
  private handleAuthError<T>(error: HttpErrorResponse, retryRequest: () => Observable<T>): Observable<T> {
    if (error.status === 401 || error.status === 403) {
      this.tokenService.clearToken();
      return this.tokenService.getToken().pipe(
        switchMap(newToken => {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${newToken}`
          });
          return retryRequest();
        }),
        catchError(() => throwError('Token refresh failed. Please try again later.'))
      );
    }
    return throwError(error);
  }
}
