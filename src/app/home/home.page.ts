import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ModalController } from '@ionic/angular';

// component
import { RecipeFormPage } from '../recipes/recipe-form/recipe-form.page';
// services
import { RecipesService } from '../shared/services/recipesService/recipes.service';
// interfaces
import { I_Recipe } from '../shared/Models/I_Recipes';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // AI
  private _modalCtrl = inject(ModalController);
  private _recipiesService = inject(RecipesService);

  protected recipes = signal<I_Recipe[]>([]);

  constructor() {
    this._constructComponent();

    effect(() => console.log('recipies', this.recipes));
  }

  ngOnInit() {}

  private _loadAllRecipies() {
    this._recipiesService.getAll().then((recipes: I_Recipe[]) => {
      this.recipes.set([...recipes]);
    });
  }

  async onOpenRecipiesFormModal() {
    const modal = await this._modalCtrl.create({
      component: RecipeFormPage,
      componentProps: {
        modus: 'created',
      },
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    this.recipes.set([data, ...this.recipes()]);
  }

  private _constructComponent() {
    this._loadAllRecipies();
  }
}
