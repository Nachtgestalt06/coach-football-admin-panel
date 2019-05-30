import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {AppRoutes} from './app.routes';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
