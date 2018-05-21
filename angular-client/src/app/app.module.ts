import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { WEB_DECLARATIONS, SERVICES_DECLARATIONS } from './index';

@NgModule({
  declarations: [
    AppComponent,
    ...WEB_DECLARATIONS
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [SERVICES_DECLARATIONS],
  bootstrap: [AppComponent]
})
export class AppModule { }
