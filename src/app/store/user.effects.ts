import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiService } from '../services/api.service';
import { saveUser, saveUserSuccess, saveUserFailure, loadUserProfile, loadUserProfileSuccess, loadUserProfileFailure } from '../store/user.action';

@Injectable()
export class UserEffects {

  saveUser$ = createEffect(() => this.actions$.pipe(
    ofType(saveUser),
    mergeMap(action =>
      this.apiService.post('register', action.user).pipe(
        map(user => saveUserSuccess({ user })),
        catchError(error => of(saveUserFailure({ error })))
      )
    )
  ));

  loadUserProfile$ = createEffect(() => this.actions$.pipe(
    ofType(loadUserProfile),
    mergeMap(action =>
      this.apiService.get(`user?name=${action.name}`).pipe(
        map(user => loadUserProfileSuccess({ user })),
        catchError(error => of(loadUserProfileFailure({ error })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}
}
