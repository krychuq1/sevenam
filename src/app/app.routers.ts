import {Route} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {ContactComponent} from "./pages/contanct/contact.component";
import {AboutUsComponent} from "./pages/about-us/about-us.component";
import {ServicesComponent} from "./pages/services/services.component";
import {ProjectsComponent} from "./pages/projects/projects.component";

export const routes: Route[] = [
  { path: '', component: HomeComponent,  pathMatch: 'full'  },
  { path: 'contact', component: ContactComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'services', component: ServicesComponent},
  { path: 'projects', component: ProjectsComponent}
];
