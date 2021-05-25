import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from './storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage,) { }

  public getItemByKey(key: string): any {
    return this.storage.getItem(key);
  }

  public setItemByKey(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  public removeItemByKey(key: string): void {
    this.storage.removeItem(key);
  }

}
