import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../../services/data.service';
import { SecretsService } from '../../services/secrets.service';
import { Location, Review } from '../../models/location';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {

  @Input() location: Location;

  public hasDetails: boolean;
  public gApiKey: string = "";
  public locations: Location[];
    
  constructor(
    private dataService: DataService,
    private secretsService: SecretsService,
    private authService: AuthService) { }

  ngOnInit(): void {
    //get G API key
    this.secretsService
      .getSecretByKey("GOOGLE_API_KEY")
      .then(result => {
        if (!result.message) {
          this.gApiKey = result.secret;
        }
      });

      this.locations = [this.location];
      console.log("locations =>", this.locations);
      
  }


  ngOnDestroy(): void {
  }  
}
