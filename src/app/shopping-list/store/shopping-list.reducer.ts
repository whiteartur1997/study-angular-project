import {Ingredient} from "../../shared/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions'

export interface AppState {
  shoppingList: State
}

export interface State {
  ingredients: Ingredient[],
  editedIngredient: Ingredient | null,
  editedIngredientIndex: number
}

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch(action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          action.payload
        ]
      }
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          ...action.payload
        ]
      }
    case ShoppingListActions.EDIT_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient, index) => index === action.payload.index ? action.payload.newIngredient : ingredient)
      }
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ing, i) => i !== action.payload),
      }
    default:
      return state;
  }
}
