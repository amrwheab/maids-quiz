import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/_shared/services/users.service';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('menu', { static: false }) menu!: Menu;

  title = 'maids-quiz';
  searchValue = '';
  timeoutBeforeSearch: any;
  subscription!: Subscription;

  items: MenuItem[] = [];

  constructor(
    private userServ: UsersService,
    private router: Router,
    private loader: LoadingBarService
  ) {}

  ngOnInit(): void {
    document.addEventListener('click', () => {
      if (this.menu) {
        this.items = [];
        this.menu.hide();
      }
    })
  }

  searchUsers(e: Event): void {
    clearTimeout(this.timeoutBeforeSearch)
    this.loader.start();
    this.timeoutBeforeSearch = setTimeout(() => {
      this.items = [];
      this.subscription = this.userServ.getOneUser(this.searchValue).subscribe(user => {
          this.items.push({
            label: 'Results',
            items: [
              {
                label: user.first_name + ' ' + user.last_name,
                icon: 'pi pi-user',
                command: () => {
                  this.router.navigate(['/user', this.searchValue]);
                  this.searchValue = '';
                }
              }
            ]
          })
        this.menu.toggle(e);
      }, () => {
        this.items.push({
          label: 'Results',
          items: [
            {
              label: 'No Data',
              icon: 'pi pi-ban'
            }
          ]
        })
        this.menu.toggle(e);
      })
    }, 1000)
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
