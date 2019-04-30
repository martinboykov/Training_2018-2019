import { ErrorComponent } from './error.component';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public dialog: MatDialog) { }
  // look at (same) D:\Programing\Video_Tutorials\_MY_TRAINING\Javascript\_Angular\Video\The_Complete_Guide_Angular_6\23.Bonus_The_HttpClient
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError(
        // (error: HttpErrorResponse) => {
        //   let errorMessage = 'An unknown error occured!'
        //   if (error.error.error.message) {
        //     errorMessage = error.error.error.message;
        //   }
        //   this.dialog.open(ErrorComponent, {
        //     data: {
        //       message: errorMessage,
        //     }
        //   }); // opening the error component => will be able to see it
        //   console.log(error.error.error.message);
        //   // alert(error.error.error.message)
        //   return throwError(error);
        // })

        // If we use our own error message in the server
        (error: HttpErrorResponse) => {
          let errorMessage = 'An unknown error occured!'
          if (error.error.message) {
            errorMessage = error.error.message;
          }
          this.dialog.open(ErrorComponent, {
            data: {
              message: errorMessage,
            }
          }); // opening the error component => will be able to see it
          console.log(error);
          // alert(error.error.error.message)
          return throwError(error);
        })
    );
  }
}
