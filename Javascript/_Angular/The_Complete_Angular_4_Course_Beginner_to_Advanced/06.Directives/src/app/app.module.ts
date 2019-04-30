import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgifComponent } from './ngif/ngif.component';
import { S062hiddenPropertyComponent } from './s062hidden-property/s062hidden-property.component';
import { ChangesComponent } from './changes/changes.component';
import { DirectiveNgForComponent } from './directive-ng-for/directive-ng-for.component';
import { DirectiveNgForChangesDetectionComponent } from './directive-ng-for-changes-detection/directive-ng-for-changes-detection.component';
import { DirectiveNgForTrackbyComponent } from './directive-ng-for-trackby/directive-ng-for-trackby.component';
import { DirectiveNgClassComponent } from './directive-ng-class/directive-ng-class.component';
import { DirectiveNgStyleComponent } from './directive-ng-style/directive-ng-style.component';
import { DirectiveSaveTraversalOperatorComponent } from './directive-save-traversal-operator/directive-save-traversal-operator.component';
import { DirectiveCustomComponent } from './directive-custom/directive-custom.component';
import { InputFormatDirective } from './input-format.directive';

@NgModule({
  declarations: [
    AppComponent,
    NgifComponent,
    S062hiddenPropertyComponent,
    ChangesComponent,
    DirectiveNgForComponent,
    DirectiveNgForChangesDetectionComponent,
    DirectiveNgForTrackbyComponent,
    DirectiveNgClassComponent,
    DirectiveNgStyleComponent,
    DirectiveSaveTraversalOperatorComponent,
    DirectiveCustomComponent,
    InputFormatDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
