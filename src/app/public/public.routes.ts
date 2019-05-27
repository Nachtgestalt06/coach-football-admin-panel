import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';

export const PublicRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'signin'
  },
  {
    path: 'signin',
    component: LoginComponent
  }
];
