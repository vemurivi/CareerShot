import { createAction, props } from '@ngrx/store';

export const saveUser = createAction(
  '[User] Save User',
  props<{ user: any }>()
);

export const saveUserSuccess = createAction(
  '[User] Save User Success',
  props<{ user: any }>()
);

export const saveUserFailure = createAction(
  '[User] Save User Failure',
  props<{ error: any }>()
);

export const loadUserProfile = createAction(
  '[User] Load User Profile',
  props<{ name: string }>()
);

export const loadUserProfileSuccess = createAction(
  '[User] Load User Profile Success',
  props<{ user: any }>()
);

export const loadUserProfileFailure = createAction(
  '[User] Load User Profile Failure',
  props<{ error: any }>()
);
