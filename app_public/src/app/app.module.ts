import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faStar} from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { AppComponent } from './app.component';
import { HomeListComponent } from './home-list/home-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeListComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule 
  ],
  providers: [],
  bootstrap: [HomeListComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faStar, farStar, faGithub);
  }
}
