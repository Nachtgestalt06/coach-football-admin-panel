import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MENU_ROUTES} from './menu.routes';
import {HomeComponent} from './home/home.component';

export const AdminRoutes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'dashboard'
  // },
  {
    path: '', component: HomeComponent,
    children: MENU_ROUTES
  }

];
