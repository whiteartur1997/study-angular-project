import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipeService} from "../app/recipes/recipe.service";
import {Recipe} from "../app/recipes/recipe.model";
import {exhaustMap, map, take, tap} from "rxjs";
import {AuthService} from "../app/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private auth: AuthService
  ) {}

  fetchRecipes() {
    return this.http.get<Recipe[]>(
      `https://ng-recipes-50044-default-rtdb.europe-west1.firebasedatabase.app/recipes.json`,
    ).pipe(
      map(recipes => {
        return recipes.map(recipe => recipe.ingredients
          ? recipe
          : { ...recipe, ingredients: []})
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }))
  }

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(
      'https://ng-recipes-50044-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes
    ).subscribe(data => {
      console.log(data)
    })
  }
}
