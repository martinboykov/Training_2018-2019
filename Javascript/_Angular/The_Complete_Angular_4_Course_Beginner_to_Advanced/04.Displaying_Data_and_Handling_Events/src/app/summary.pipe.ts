import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
  name: 'summary'
})
export class SummaryPipe implements PipeTransform {
  transform(value: any, args?: any) {
    if (!value) return null;
    let actualLimit = (args)? args : 50;
    return value.substr(0, actualLimit) + '...';
  }
}

// must register it in (App or Other)Module
