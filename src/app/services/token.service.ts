import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  // Update the authUrl to point to the proxy server
  private authUrl = 'https://proxyserverauth.azurewebsites.net/auth/token';
  private clientId = '6a0f6c41-54b3-47a7-b2aa-e1214a908561';
  private clientSecret = '3O68Q~2ID2lV1~x77.gqumcLSIzi2ExIMcXSic4x';
  private scope = 'api://6a0f6c41-54b3-47a7-b2aa-e1214a908561/.default';
  private token = '';

  constructor(private http: HttpClient) {}

  // Method to retrieve the JWT token
  private retrieveToken(): Observable<string> {
    const body = new HttpParams()
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret)
      .set('scope', this.scope)
      .set('grant_type', 'client_credentials');

    return this.http.post<any>(this.authUrl, body.toString(), {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }).pipe(
      map(response => {
        if (response && response.access_token) {
          this.token = response.access_token;
          return this.token;
        } else {
          throw new Error('Token retrieval failed');
        }
      }),
      catchError(error => {
        console.error('Token retrieval error:', error);
        return throwError('Token retrieval failed');
      })
    );
  }

  // Method to get the token, regenerates a new one if necessary
  getToken(): Observable<string> {
    if (this.token) {
      return of(this.token);
    } else {
      return this.retrieveToken().pipe(
        map(token => {
          if (token === '') {
            throw new Error('Token is null');
          }
          return token;
        })
      );
    }
  }

  // Method to clear the token (e.g., on token expiration)
  clearToken() {
    this.token = '';
  }
}
