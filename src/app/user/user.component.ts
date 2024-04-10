import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { User } from 'src/_shared/interfaces/User';
import { UsersService } from 'src/_shared/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  user!: User;
  subscription = new Subscription();
  loading = true;

  constructor (
    private userServ: UsersService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.actRoute.params.pipe(
        switchMap(({id}) => {
          return this.userServ.getOneUser(id)
        })
      ).subscribe((user: User) => {
        this.user = user;
        this.loading = false;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
