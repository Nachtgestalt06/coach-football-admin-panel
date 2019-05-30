import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminRoutes} from './admin.routes';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MaterialModule} from '../material.module';
import {HomeComponent} from './home/home.component';
import {NewsComponent} from './news/news.component';
import {TeamsComponent} from './teams/teams.component';
import {PlayersComponent} from './players/players.component';
import {BetsComponent} from './bets/bets.component';
import {ComponentsModule} from '../components/components.module';
import {AddNewComponent} from './news/add-new/add-new.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AddBetComponent} from './bets/add-bet/add-bet.component';
import {AddTeamComponent} from './teams/add-team/add-team.component';
import {AddPlayerComponent} from './players/add-player/add-player.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    NewsComponent,
    TeamsComponent,
    PlayersComponent,
    BetsComponent,
    AddNewComponent,
    AddBetComponent,
    AddTeamComponent,
    AddPlayerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
    RouterModule.forChild(AdminRoutes)
  ],
  entryComponents: [
    AddNewComponent,
    AddBetComponent,
    AddTeamComponent,
    AddPlayerComponent
  ]
})
export class AdminModule {
}
