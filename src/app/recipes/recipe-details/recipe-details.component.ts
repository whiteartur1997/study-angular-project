import {Component, OnInit} from "@angular/core";
import {Recipe} from "../recipe.model";
import {RecipesService} from "../recipes.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})

export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.recipe = this.recipesService.getRecipeById(+params["id"])
    })
  }

  onAddToShoppingList() {
    this.recipesService.onAddToShoppingList(this.recipe.ingredients)
  }
}
