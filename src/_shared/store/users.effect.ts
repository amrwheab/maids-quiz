import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersService } from "../services/users.service";
import { loadUsers, loadUsersFailiar, loadUsersSuccess } from "./users.action";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(({ page }) =>
        this.userServ.getUsers(page).pipe(
          map(data => loadUsersSuccess({ users: data.data, total: data.total, perPage: data.per_page })),
          catchError(() => of(loadUsersFailiar()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userServ: UsersService
  ) {}
}
