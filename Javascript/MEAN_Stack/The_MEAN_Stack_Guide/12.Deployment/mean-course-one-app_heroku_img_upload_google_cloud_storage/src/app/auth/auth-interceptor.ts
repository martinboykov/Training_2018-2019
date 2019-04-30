import {
  HttpInterceptor, HttpRequest, HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  // look at (same) D:\Programing\Video_Tutorials\_MY_TRAINING\Javascript\_Angular\Video\The_Complete_Guide_Angular_6\23.Bonus_The_HttpClient
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    console.log(authToken);
    const authRequest = req.clone({
      // creating copy to the request
      // 1st Approach: setting the token in the url
      // params: req.params.set('auth', this.auth.getToken())

      // 2nd Approach: setting the token in the header
      headers: req.headers.set("Authorization", "Bearer " + authToken) // Bearer + authtoken (according a convention) / cn be skipped (only authToken)
    });
    return next.handle(authRequest);
  }
}
