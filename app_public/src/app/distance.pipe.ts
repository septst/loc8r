import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {

  transform(distance: number): string {
    if (distance && this.isNumeric(distance)) {
      let unit = 'm';
      if (distance > 1000) {
        distance = (distance / 1000);
        unit = 'km';
      } else if (distance > 0) {
        distance = Math.floor(distance);
      }
      return (distance > 0 ? distance.toFixed(1) : "0") + ' ' + unit;
    } else {
      return '?';
    }
  }

  isNumeric(n: number): boolean {
    return !isNaN(n) && isFinite(n);
  }

}
