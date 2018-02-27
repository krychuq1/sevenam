import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Autosize} from 'angular2-autosize';


import { AppComponent } from './app.component';
import {HomeComponent} from "./pages/home/home.component";
import {RouterModule} from "@angular/router";
import {routes} from "./app.routers";
import {HeaderComponent} from "./components/header.component";
import {BurgerService} from "./services/burger.service";
import {ContactComponent} from "./pages/contanct/contact.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ContactComponent,
    Autosize
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),

  ],
  providers: [BurgerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
