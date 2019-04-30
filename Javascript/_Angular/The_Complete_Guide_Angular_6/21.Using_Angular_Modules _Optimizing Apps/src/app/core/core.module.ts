import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { HomeComponent } from './/home/home.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../services/auth-guard.service';
import { AuthService } from '../services/auth.service';
import { RecipiesService } from '../services/recipies.service';
import { IngredientsService } from '../services/ingredients.service';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    SharedModule, // Directives (Dropdown)
    AppRoutingModule, // routerlinks in the header
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  exports: [
    AppRoutingModule, // root routs in app module
    HeaderComponent // in order to use app-header in app.component.html
  ],
  providers: [
    IngredientsService,
    RecipiesService,
    AuthService,
    AuthGuard
  ]
})
export class CoreModule {

}
