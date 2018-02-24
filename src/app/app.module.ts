import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {HomeComponent} from "./pages/home/home.component";
import {RouterModule} from "@angular/router";
import {routes} from "./app.routers";
import {HeaderComponent} from "./components/header.component";
import {BurgerService} from "./services/burger.service";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),

  ],
  providers: [BurgerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
