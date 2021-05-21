import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoaderState } from './loader-state';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public status = new BehaviorSubject<boolean>(false);

  constructor() { }

  display(value: boolean) {  
    this.status.next(value);
  }
}


