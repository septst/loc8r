import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Location } from 'src/app/models/location';
import { SecretsService } from 'src/app/services/secrets.service';
import { StorageService } from 'src/app/services/storage.service';
import { ThemingService } from 'src/app/services/theming.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapsComponent implements OnInit {

  @Input() latitude: number;
  @Input() longitude: number;
  @Input() locations: Location[];
  @Input() customWidth: number;
  @Input() customHeight: number;

  public markers: any[] = [];
  public options: google.maps.MapOptions;
  public mapId: string;

  public darkModeKey: string = "dark-mode";
  public themingSubscription: Subscription;
  public defaultWidth: number = 700;
  public defaultHeight: number = 500;

  constructor(
    private themingService: ThemingService,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.setMapOptions();

    this.loadMarkers();

    this.themingSubscription = this.themingService.theme.subscribe((theme: string) => {
      this.setMapOptions();
    });

    this.customHeight = this.customHeight > 0 ? this.customHeight : this.defaultHeight;
    this.customWidth = this.customWidth > 0 ? this.customWidth : this.defaultWidth;
  }

  private setMapOptions() {
    this.options = {
      center: {
        lat: this.latitude,
        lng: this.longitude
      },
      zoom: 14,
      mapId: this.storageService.getItemByKey(this.darkModeKey) ?
        "673c16b597ccd272" :
        "89c318d8d1c614fb",
      maxZoom: 30,
      minZoom: 5,
    } as google.maps.MapOptions;
  }

  private loadMarkers() {
    if (this.locations && this.locations.length > 0) {
      this.locations.forEach(loc => {
        this.markers.push({
          position: {
            lat: loc.coords.coordinates[1],
            lng: loc.coords.coordinates[0]
          },
          label: {
            text: loc.name
          },
          options: {
            animation: google.maps.Animation.DROP,
            draggable: false
          },
        });
      });
    }
  }
}
