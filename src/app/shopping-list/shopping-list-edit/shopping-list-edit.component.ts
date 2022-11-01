import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('ingredientForm') ingredientForm: NgForm;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
   this.subscription = this.shoppingListService.ingredientStartedEditing.subscribe((index) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.ingredientForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount,
      })
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  onSubmit(ingredientForm: NgForm) {
    const newIngredient = new Ingredient(
      ingredientForm.value.name,
      ingredientForm.value.amount,
    );
    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
    } else {
      this.shoppingListService.addIngredient(newIngredient)
    }
    this.onResetForm()
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex)
    this.onResetForm()
  }

  onResetForm() {
    this.editMode = false
    this.ingredientForm.reset()
  }
}
