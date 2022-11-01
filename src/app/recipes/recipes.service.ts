import {Recipe} from "./recipe.model";
import { Injectable} from "@angular/core";
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipesService {

  constructor(private shoppingListService: ShoppingListService) {}

  private recipes: Recipe[] = [
    new Recipe(
      "Apple Pie",
      "Tasty Pie",
      "https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Apple-Pie_EXPS_MRRA22_6086_E11_03_1b_v3.jpg",
      [
        new Ingredient("apple", 20),
        new Ingredient("brad stuffs", 10)
      ]
    ),
    new Recipe(
      "Burger",
      "Tasty Burger",
      "https://img.freepik.com/premium-psd/fresh-tasty-burgers-with-chicken-patty-transparent-background_670625-648.jpg",
      [
        new Ingredient("buns", 2),
        new Ingredient("meat", 1)
      ]
    ),
  ]

  getRecipes() {
    // we return not the array itself but copy
    return this.recipes.slice()
  }

  getRecipeById(id: number) {
    return {...this.getRecipes()[id]}
  }

  onAddToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients)
  }
}
