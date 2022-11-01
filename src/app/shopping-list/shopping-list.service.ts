import {Ingredient} from "../../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient("apple", 5),
    new Ingredient("tomato", 10),
  ]

  private ingredientsName: string[] = this.ingredients.map(ing => ing.name)

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(i: number) {
    return {...this.ingredients[i]}
  }

  ingredientsChanged = new Subject<Ingredient[]>()
  ingredientStartedEditing = new Subject<number>()

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  updateIngredient(index: number, updatedIngredient: Ingredient) {
    this.ingredients[index] = updatedIngredient;
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  addIngredients(ingredients: Ingredient[]) {
    for(let ingredient of ingredients) {
      if(this.ingredientsName.includes(ingredient.name)) {
        this.ingredients = this.ingredients.map(ing => ing.name === ingredient.name ?
          new Ingredient(ing.name, ing.amount + ingredient.amount) : ing
        )
      } else {
        this.ingredients.push(ingredient)
      }
    }
    this.ingredientsName = this.ingredients.map(ing => ing.name)
    this.ingredientsChanged.next(this.ingredients.slice())
  }
}
