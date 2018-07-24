import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
