import { ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http'; // deprecated
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';

import { AppErrorHandler } from './common/app-error-handler';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { PostService } from './services/post.service';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule, // deprecated
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [
    PostService,
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler // whetever ErrorHandler is used, change it for AppErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
