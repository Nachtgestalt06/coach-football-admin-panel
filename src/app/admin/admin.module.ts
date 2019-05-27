import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminRoutes} from './admin.routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MaterialModule} from '../material.module';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { TeamsComponent } from './teams/teams.component';
import { PlayersComponent } from './players/players.component';
import { BetsComponent } from './bets/bets.component';
import {ComponentsModule} from '../components/components.module';

@NgModule({
  declarations: [DashboardComponent, HomeComponent, NewsComponent, TeamsComponent, PlayersComponent, BetsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    RouterModule.forChild(AdminRoutes)
  ]
})
export class AdminModule { }
