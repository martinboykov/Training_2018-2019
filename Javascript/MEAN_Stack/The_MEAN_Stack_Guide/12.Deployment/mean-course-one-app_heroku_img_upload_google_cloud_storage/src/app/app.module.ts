import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//  import { AuthModule } from './auth/auth.module';

import { AngularMaterialMudule } from './angular-material.module';

import { ErrorComponent } from './error-handling/error.component';
import { ErrorInterceptor } from './error-handling/error-interceptor';
import { AuthInterceptor } from './auth/auth-interceptor';

import { PostService } from './posts/post.service';
import { PostsModule } from './posts/posts.module';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // FormsModule,
    // ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialMudule,
    PostsModule,
    //  AuthModule, // imported in app-routing.module (lazy loading)
  ],
  // multi : true -> dont overwrite existing interceptors
  providers: [
    PostService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],

  // dynamicly create the Error component
  // https://angular.io/guide/entry-components#entrycomponents-and-the-compiler
  // If a component isn't an entry component and isn't found in a template,
  // the tree shaker will throw it away.So, it's best to add only the components
  // that are truly entry components to help keep your app as trim as possible.
  entryComponents: [ErrorComponent]
})
export class AppModule { }
