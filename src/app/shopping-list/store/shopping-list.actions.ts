import {Action} from "@ngrx/store";
import {Ingredient} from "../../shared/ingredient.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS'
export const EDIT_INGREDIENT = 'EDIT_INGREDIENT'
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT'
export const START_EDIT_INGREDIENT = 'START_EDIT_INGREDIENT'
export const FINISH_EDIT_INGREDIENT = 'FINISH_EDIT_INGREDIENT'

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT
  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS
  constructor(public payload: Ingredient[]) {}
}

export class EditIngredient implements Action {
  readonly type = EDIT_INGREDIENT

  constructor(public payload: { index: number, newIngredient: Ingredient }) {}
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT

  constructor(public payload: number) {
  }
}

export class StartEditIngredient implements Action {
  readonly type = START_EDIT_INGREDIENT

  constructor(public payload: { index: number, ingredient: Ingredient }) {
  }
}

export type ShoppingListActions = AddIngredient | AddIngredients | EditIngredient | DeleteIngredient;
