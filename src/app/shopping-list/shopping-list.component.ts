import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  ingredientsAddedSubscription: Subscription
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients()
    this.ingredientsAddedSubscription = this.shoppingListService.ingredientAdded.subscribe(ingredients => {
      this.ingredients =  ingredients;
    })
  }

  ngOnDestroy() {
    this.ingredientsAddedSubscription.unsubscribe()
  }
}
