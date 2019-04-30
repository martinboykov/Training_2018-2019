import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: string, limit?: number): any {
    const limmitDefault = limit || 10;
    if (value.length > 10) {
      return value.substr(0, limmitDefault) + '...';
    }
    return value;
  }

}
