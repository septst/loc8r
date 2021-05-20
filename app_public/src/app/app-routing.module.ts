import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Route[] = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomepageComponent },
  { path: "about", component: AboutComponent },
  { path: "location/:locationId", component: DetailsPageComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
