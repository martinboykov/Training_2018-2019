import { NavbarToggleDirective } from './navbar-toggle.directive';
import { ShortenPipe } from './shorten.pipe';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { NgModule } from '@angular/core';
@NgModule({
  declarations: [
    NavbarToggleDirective,
    DropdownDirective,
    ShortenPipe,

  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    NavbarToggleDirective,
    DropdownDirective,
    ShortenPipe
  ]
})
export class SharedModule {

}
