import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { recipeResolver } from './recipes/recipeResolver/recipe.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'recipes-list',
    loadChildren: () => import('./recipes/recipes-list/recipes-list.module').then( m => m.RecipesListPageModule)
  },
  {
    path: 'recipe/:recipeId',
    resolve: {
      recipe: recipeResolver,
    },
    loadChildren: () => import('./recipes/recipe/recipe.module').then( m => m.RecipePageModule)
  },
  {
    path: 'recipe-form',
    loadChildren: () => import('./recipes/recipe-form/recipe-form.module').then( m => m.RecipeFormPageModule)
  },
  {
    path: 'firestore',
    loadChildren: () => import('./example/firestore/firestore.module').then( m => m.FirestorePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
