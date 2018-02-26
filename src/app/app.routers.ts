import {Route} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {ContactComponent} from "./pages/contanct/contact.component";

export const routes: Route[] = [
  { path: '', component: HomeComponent,  pathMatch: 'full'  },
  { path: 'contact', component: ContactComponent}
];
