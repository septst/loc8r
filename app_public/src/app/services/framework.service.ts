import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrameworkService {

  public showProgress: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public currentLocation: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor() { }
}
