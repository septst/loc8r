import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';

//library
import { faStar} from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

//components
import { HomeListComponent } from './home-list/home-list.component';

//pipes
import { DistancePipe } from './distance.pipe';


@NgModule({
  declarations: [
    HomeListComponent,
    DistancePipe
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [HomeListComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faStar, farStar, faGithub);
  }
}
