import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostRecentFirst'
})
export class MostRecentFirstPipe implements PipeTransform {

  transform(reviews: any[], limit: number): any[] {
    if (reviews && reviews.length) {
      return reviews.length > limit ?
        reviews.sort(this.compare).slice(0, limit) :
        reviews.sort(this.compare);
    }
    return [];
  }

  private compare(a: any, b: any): number {
    const createdOnA = a.createdOn;
    const createdOnB = b.createdOn;
    let comparison = 1;
    if (createdOnA > createdOnB) {
      comparison = -1;
    }
    return comparison;
  }

}
