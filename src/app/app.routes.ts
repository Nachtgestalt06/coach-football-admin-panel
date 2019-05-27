import {Routes} from '@angular/router';

export const AppRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'public'},
  {path: 'public', loadChildren: './public/public.module#PublicModule'},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule'}
];
