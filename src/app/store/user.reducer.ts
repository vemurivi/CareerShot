import { createReducer, on, Action } from '@ngrx/store';
import { saveUserSuccess, saveUserFailure, loadUserProfileSuccess, loadUserProfileFailure } from './user.action';

export interface UserState {
  user: any | null;
  error: any | null;
}

export const initialState: UserState = {
  user: null,
  error: null,
};

const _userReducer = createReducer(
  initialState,
  on(saveUserSuccess, (state, { user }) => ({ ...state, user })),
  on(saveUserFailure, (state, { error }) => ({ ...state, error })),
  on(loadUserProfileSuccess, (state, { user }) => ({ ...state, user })),
  on(loadUserProfileFailure, (state, { error }) => ({ ...state, error }))
);

export function userReducer(state: UserState | undefined, action: Action) {
  return _userReducer(state, action);
}
