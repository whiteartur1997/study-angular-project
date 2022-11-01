import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('nameInputRef') nameInputRef: ElementRef<HTMLInputElement>;
  @ViewChild('amountInputRef') amountInputRef: ElementRef<HTMLInputElement>;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddIngredient() {
    const newIngredient = new Ingredient(
      this.nameInputRef.nativeElement.value,
      +this.amountInputRef.nativeElement.value
    );
    this.shoppingListService.addIngredient(newIngredient)
  }
}
