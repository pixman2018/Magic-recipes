import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Firestore } from '@angular/fire/firestore';


import {  I_Recipe } from '../shared/Models/I_Recipes';
import { I_Ingredient } from '../shared/Models/I_Ingredient';
import { RecipesService } from '../shared/services/recipes/recipes.service';
import { IngredientsService } from '../shared/services/ingredients-service/ingredients.service';
import { RecipeFormPage } from '../recipes/recipe-form/recipe-form.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private _firestore = inject(Firestore);
  private _recipiesService = inject(RecipesService);
  private _ingridientService = inject(IngredientsService);

  protected recipes = signal<I_Recipe[]>([]);
  protected ingridients: I_Ingredient[] = [];
  // AI
  private _modalCtrl = inject(ModalController);

  protected message: string = 'This modal example uses the modalController to present and dismiss modals.';



  constructor() {
    this._constructComponent();

    effect(() => console.log('recipies', this.recipes));
  }

  ngOnInit() {
  }

  private _loadAllRecipies() {
    this._recipiesService.getAll()
      .then((recipes: I_Recipe[]) => {
        this.recipes.set([...recipes]);
      });
  }

  async onOpenRecipiesFormModal() {
    const modal = await this._modalCtrl.create({
      component: RecipeFormPage,
      componentProps: {
        modus: 'created',
      }
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    this.recipes.set([
      data,
      ...this.recipes(),
    ]);

  }




private _constructComponent() {
  this._loadAllRecipies();
}


}
