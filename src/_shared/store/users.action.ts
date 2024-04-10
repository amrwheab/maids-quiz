import { createAction, props } from '@ngrx/store';
import { User } from '../interfaces/User';

export const loadUsers = createAction('[User] Load Users', props<{page: number}>());
export const loadUsersSuccess = createAction('[User] Load Users Success', props<{users: User[], total: number, perPage: number}>());
export const loadUsersFailiar = createAction('[User] Load Users Failiar');
