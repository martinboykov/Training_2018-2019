import { ShoppingListComponent } from './shopping-list.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const shoppinListRouts: Routes = [
  { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
  imports: [
    // useHаsh for 404 linking to html ( when server is hosting the App)
    // server will ignore everything before #
    // so the part after the # is parsed by the client
    // RouterModule.forRoot(appRoutes, { useHash: true })
    RouterModule.forChild(shoppinListRouts)
  ],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule {

}
