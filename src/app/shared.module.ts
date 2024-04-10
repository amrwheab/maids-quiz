import { NgModule } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@NgModule({
  exports: [
    DataViewModule,
    ToolbarModule,
    CardModule,
    PaginatorModule,
    InputTextModule,
    ButtonModule,
    MenuModule,
    LoadingBarModule,
    ProgressSpinnerModule
  ],

})
export class SharedModule { }
