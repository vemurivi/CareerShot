import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { loadUserProfileSuccess } from '../store/user.action';
import { selectUserProfile } from '../store/user.selector';
import { UserState } from '../store/user.reducer';

export const userGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  const store = inject(Store<UserState>);
  const apiService = inject(ApiService);
  const router = inject(Router);
  const userName = route.paramMap.get('name');

  if (!userName) {
    router.navigate(['/register']);
    return of(false);
  }

  return store.select(selectUserProfile).pipe(
    switchMap(userProfile => {
      if (userProfile) {
        return of(true);
      } else {
        return apiService.get(`user?name=${userName}`).pipe(
          map(profile => {
            if (profile) {
              // Dispatch an action to save the profile in the store
              store.dispatch(loadUserProfileSuccess({ user: profile }));
              return true;
            } else {
              router.navigate(['/register']);
              return false;
            }
          }),
          catchError(() => {
            router.navigate(['/register']);
            return of(false);
          })
        );
      }
    })
  );
};
