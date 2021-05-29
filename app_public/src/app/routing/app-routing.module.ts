import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AboutComponent } from '../components/about/about.component';
import { DetailsPageComponent } from '../components/details-page/details-page.component';
import { HomepageComponent } from '../components/homepage/homepage.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { SettingsComponent } from '../components/settings/settings.component';

const routes: Route[] = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "home", component: HomepageComponent },
  { path: "about", component: AboutComponent },
  { path: "settings", component: SettingsComponent },
  { path: "location/:locationId", component: DetailsPageComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
