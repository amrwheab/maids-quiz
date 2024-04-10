import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { OneUserData, User, UserData } from 'src/_shared/interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'https://reqres.in/api/users';

  constructor(
    private http: HttpClient
  ) { }

  getUsers(page: number | string): Observable<UserData> {
    return this.http.get<UserData>(this.apiUrl, {params: {page}})
  }

  getOneUser(id: number | string): Observable<User> {
    return this.http.get<OneUserData>(this.apiUrl + `/${id}`)
    .pipe(map(({data}) => data))
  }

}
