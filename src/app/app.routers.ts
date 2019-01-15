import {Route} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {ContactComponent} from "./pages/contanct/contact.component";
import {AboutUsComponent} from "./pages/about-us/about-us.component";
import {ServicesComponent} from "./pages/services/services.component";
import {ProjectsComponent} from "./pages/projects/projects.component";
import {SingleProjectComponent} from "./pages/single-project/single-project.component";
import {TestComponent} from "./pages/test/test.component";
import {VideoComponent} from "./pages/about-us/video/video.component";
import {ContactThankYouComponent} from "./pages/contanct/contact-thank-you/contact-thank-you.component";

export const routes: Route[] = [
  { path: '', component: HomeComponent,  pathMatch: 'full'  },
  { path: 'contact', component: ContactComponent,
    children: [{path: 'thank-you', component: ContactThankYouComponent}]
  },

  { path: 'about-us', component: AboutUsComponent,
    children: [{path: 'video', component: VideoComponent}]
      },
  { path: 'services', component: ServicesComponent},
  { path: 'projects', component: ProjectsComponent},
  { path: 'projects/:filter', component: ProjectsComponent},

  { path: 'test', component: TestComponent},
  { path: 'product/:projectName', component: SingleProjectComponent}

];

