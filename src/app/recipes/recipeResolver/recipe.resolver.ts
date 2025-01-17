import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { I_Recipe } from 'src/app/shared/Models/I_Recipes';
import { RecipesService } from 'src/app/shared/services/recipesService/recipes.service';

export const recipeResolver: ResolveFn<I_Recipe | null> = async(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
    const recipeId = route.paramMap.get('recipeId');
    if (!recipeId) {
      return null;
    }

    const recipiesService = inject(RecipesService);
    return recipiesService.getById(recipeId);
};
