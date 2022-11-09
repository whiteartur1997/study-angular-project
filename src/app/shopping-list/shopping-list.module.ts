import {NgModule} from "@angular/core";
import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {ShoppingListRoutingModule} from "./shopping-list-routing.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    RouterModule,
    FormsModule,
    ShoppingListRoutingModule,
    SharedModule,
  ]
})
export class ShoppingListModule {}
