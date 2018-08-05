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
import {AboutUsComponent} from "./pages/about-us/about-us.component";
import {ServicesComponent} from "./pages/services/services.component";
import {ProjectsComponent} from "./pages/projects/projects.component";
import {HttpClientModule} from "@angular/common/http";
import {LoadingService} from "./services/loading.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MailerService} from "./services/mailer.service";
import {ContentService} from "./services/content.service";
import {SingleProjectComponent} from "./pages/single-project/single-project.component";
import {TestComponent} from "./pages/test/test.component";


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),

  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ContactComponent,
    AboutUsComponent,
    ServicesComponent,
    ProjectsComponent,
    SingleProjectComponent,
    TestComponent,
    Autosize
  ],
  providers: [BurgerService, LoadingService, MailerService, ContentService],
  bootstrap: [AppComponent]
})

export class AppModule { }
