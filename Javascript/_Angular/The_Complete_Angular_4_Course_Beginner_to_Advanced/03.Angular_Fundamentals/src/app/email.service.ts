import { Injectable } from '@angular/core';

@Injectable({
  // This class is injectable, which means that you can inject dependancies in its constructor
  // In Component we dont use @Injectable, as @Component internally has it already
  providedIn: 'root'
})
export class EmailService {

  // constructor(logService: LogService) { }
}
