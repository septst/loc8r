import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimText'
})
export class TrimTextPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    return (value.length > limit) ?
      value.substr(0, limit) + "..." :
      value;
  }

}
