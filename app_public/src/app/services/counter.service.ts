import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  constructor() { }

  counter(i:number):Array<number>{
    return new Array(i);
  }
}
