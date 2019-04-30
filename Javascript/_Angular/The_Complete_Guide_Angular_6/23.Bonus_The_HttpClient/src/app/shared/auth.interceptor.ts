import { AuthService } from './../services/auth.service';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted:', req);
    const copiedRequest = req.clone({
      params: req.params.set('auth', this.auth.getToken())
    });
    return next.handle(copiedRequest);
  }
}
