import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from '../store/user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUserProfile = createSelector(
  selectUserState,
  (state: UserState) => state.user
);
