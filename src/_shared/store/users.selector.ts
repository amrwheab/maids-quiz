import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./users.reducer";

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectUsers = createSelector(
  selectUserState,
  (state: UserState) => state
);
