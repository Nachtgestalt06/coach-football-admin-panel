import {NewsComponent} from './news/news.component';
import {HomeComponent} from './home/home.component';
import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TeamsComponent} from './teams/teams.component';
import {PlayersComponent} from './players/players.component';
import {BetsComponent} from './bets/bets.component';

export const MENU_ROUTES: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
  { path: 'dashboard', component: DashboardComponent, data: {title: 'Inicio'} },
  { path: 'news', component: NewsComponent, data: {title: 'Noticias'} },
  { path: 'teams', component: TeamsComponent, data: {title: 'Equipos'} },
  { path: 'players', component: PlayersComponent, data: {title: 'Jugadores'} },
  { path: 'bets', component: BetsComponent, data: {title: 'Apuestas'} },
];
