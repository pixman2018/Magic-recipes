import { Component, inject, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Firestore } from '@angular/fire/firestore';


import {  I_Recipe } from '../shared/Models/I_Recipies';
import { I_Ingredient } from '../shared/Models/I_Ingredient';
import { RecipiesService } from '../shared/services/recipies/recipies.service';
import { IngredientsService } from '../shared/services/ingredients-service/ingredients.service';
import { RecipeFormPage } from '../recipies/recipe-form/recipe-form.page';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private _firestore = inject(Firestore);
  private _recipiesService = inject(RecipiesService);
  private _ingridientService = inject(IngredientsService);

  protected recipies: I_Recipe[] = [];
  protected ingridients: I_Ingredient[] = [];
  // AI
  private _modalCtrl = inject(ModalController);

  protected message: string = 'This modal example uses the modalController to present and dismiss modals.';

  constructor() { }

  ngOnInit() {

  }

  async onOpenRecipiesFormModal() {
    const modal = await this._modalCtrl.create({
      component: RecipeFormPage,
      componentProps: {
        modus: 'created',
        recipe: {
          title: 'Test'
        }
      }
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }







}
