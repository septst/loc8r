import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addLineBreaks'
})
export class AddLineBreaksPipe implements PipeTransform {

  transform(text: string): string {    
    return text?.replace(/\n/g, '<br/>');
  }

}
