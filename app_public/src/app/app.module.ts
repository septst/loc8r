import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//library
import { faStar, faCheck, faBars } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

//components
import { HomeListComponent } from './home-list/home-list.component';
import { FrameworkComponent } from './framework/framework.component';
import { AboutComponent } from './about/about.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRatingStarsComponent } from './app-rating-stars/app-rating-stars.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { LoaderComponent } from './loader/loader.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

//pipes
import { DistancePipe } from './distance.pipe';
import { AddLineBreaksPipe } from './add-line-breaks.pipe';
import { MostRecentFirstPipe } from './most-recent-first.pipe';

@NgModule({
  declarations: [
    HomeListComponent,
    DistancePipe,
    FrameworkComponent,
    AboutComponent,
    HomepageComponent,
    PageHeaderComponent,
    SidebarComponent,
    AddLineBreaksPipe,
    AppRatingStarsComponent,
    LocationDetailsComponent,
    DetailsPageComponent,
    MostRecentFirstPipe,
    LoaderComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  exports:[LoaderComponent],
  providers: [],
  bootstrap: [FrameworkComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faStar, farStar, faCheck, faBars, faGithub);
  }
}
