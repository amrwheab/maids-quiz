import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription, switchMap } from 'rxjs';
import { User } from 'src/_shared/interfaces/User';
import { UsersService } from 'src/_shared/services/users.service';
import { loadUsers } from 'src/_shared/store/users.action';
import { selectUsers } from 'src/_shared/store/users.selector';

interface PaginatorData {
  page: number;
  first: number;
  rows: number;
  pageCount: number;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [
    trigger('showCard', [
      transition(':enter', [
        style({ transform: 'translateY(10px)' }),
        animate('400ms', style({ transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class UsersComponent implements OnInit, OnDestroy {

  users: User[] = [];
  totalUsers: number = 1;
  usersPerPage: number = 1;
  subscription = new Subscription();
  initial = true;
  loading = true;

  constructor (
    private userServ: UsersService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.actRoute.queryParams
      .pipe(
        switchMap(({page}) => {
          if (!page) {
            const url = new URL(window.location.href);
            url.searchParams.set('page', '1');
            const newUrl = url.toString();
            history.pushState({ path: newUrl }, '', newUrl);
          }
          this.store.dispatch(loadUsers({page: page || 1}));
          return this.store.pipe(select(selectUsers));
        })
      )
      .subscribe((data) => {
        if (data) {
          this.users = data.users;
          this.totalUsers = data.total;
          this.usersPerPage = data.perPage;
          this.initial = false;
          this.loading = false;
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onPageChange({page}: PaginatorData) {
    if (!this.initial) {
      this.router.navigate([], {queryParams: { page: page + 1 }})
    }
  }

}
