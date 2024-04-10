import { createReducer, on } from "@ngrx/store";
import { User } from "../interfaces/User";
import { loadUsersSuccess } from "./users.action";

export interface UserState {
  users: User[];
  total: number;
  perPage: number;
}

export const initialState: UserState = {
  users: [],
  total: 0,
  perPage: 0
};

export const userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (_, action) => {
    return {
      users: [...action.users],
      total: action.total,
      perPage: action.perPage,
    }
  }),
);
