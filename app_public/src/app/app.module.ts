import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './materials/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

//materials
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

//components
import { HomeListComponent } from './components/home-list/home-list.component';
import { FrameworkComponent } from './components/framework/framework.component';
import { AboutComponent } from './components/about/about.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AppRatingStarsComponent } from './components/app-rating-stars/app-rating-stars.component';
import { LocationDetailsComponent } from './components/location-details/location-details.component';
import { DetailsPageComponent } from './components/details-page/details-page.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LogConfigComponent } from './components/log-config/log-config.component';
import { SettingsComponent } from './components/settings/settings.component';
//pipes
import { DistancePipe } from './pipes/distance.pipe';
import { AddLineBreaksPipe } from './pipes/add-line-breaks.pipe';
import { MostRecentFirstPipe } from './pipes/most-recent-first.pipe';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ReviewsNewComponent } from './components/reviews-new/reviews-new.component';
import { AppRatingStarsInputComponent } from './components/app-rating-stars-input/app-rating-stars-input.component';


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
    RegisterComponent,
    LoginComponent,
    LogConfigComponent,
    SettingsComponent,
    ReviewsComponent,
    ReviewsNewComponent,
    AppRatingStarsInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.DEBUG,
    })
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }
  ],
  bootstrap: [FrameworkComponent]
})
export class AppModule {}
