import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { serverTimestamp, Timestamp } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { Categories } from 'src/app/shared/data/categories-data';
import { Measurements } from 'src/app/shared/data/measurements-data';
import { I_Category } from 'src/app/shared/Models/I_Category';
import { IngredientsService } from 'src/app/shared/services/ingredients-service/ingredients.service';
import {
  I_Ingredient,
  I_IngredientFrom,
} from 'src/app/shared/Models/I_Ingredient';
import { FirebaseError } from '@angular/fire/app';
import { RecipesService } from 'src/app/shared/services/recipes/recipes.service';
import { I_Recipe } from 'src/app/shared/Models/I_Recipes';
import { RequiredIngredientsService } from 'src/app/shared/services/requiredIngredients/required-ingredients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.page.html',
  styleUrls: ['./recipe-form.page.scss'],
})
export class RecipeFormPage implements OnInit {
  private _fb = inject(FormBuilder);
  private _modalCtrl = inject(ModalController);
  private _ingridientService = inject(IngredientsService);
  private _recipiesService = inject(RecipesService);
  private _requiredIngredientService = inject(RequiredIngredientsService);
  private _router = inject(Router);

  // data from modal
  protected modus: string = '';
  protected recipe!: I_Recipe;
  // data
  protected categoriesData: I_Category[] = Categories;
  protected measurementsData: string[] = Measurements;

  protected recipeForm: FormGroup = this._createRecipeForm();
  protected isSubmit: boolean = false;

  constructor() {}

  ngOnInit() {
    console.log('modal: ', this.modus, this.recipe);
  }

  /*
   ********************************************************************************
   *****
   ***
   * Form
   ***
   *****
   ********************************************************************************
   */
  /**
   *
   * @private
   * @returns formgroup
   * @memberof RecipeFormPage
   *
   * @description
   * create the from
   *
   */
  private _createRecipeForm(): FormGroup {
    return this._fb.group({
      title: ['', [Validators.required]],
      keywords: [''],
      portions: [''],
      description: [''],
      coverUrl: [''],
      cookingTime: ['', [Validators.required, Validators.min(1)]],
      preparationTime: ['', [Validators.required, Validators.min(1)]],
      degreeOfDifficulty: ['', [Validators.required, Validators.min(1)]],
      muscleBuildingFactor: ['', [Validators.required, Validators.min(0)]],
      weightLossFactor: ['', [Validators.required, Validators.min(0)]],
      categoryIds: ['', [Validators.required]],
      materials: [''],
      ingidients: this._fb.array([this._createIngridientsFormControls()]),
      steps: this._fb.array([this._creatStepsFormControls()]),
      nutritionalValue: this._fb.group({
        calories: ['', [Validators.required, Validators.min(1)]],
        portien: ['', [Validators.required, Validators.min(1)]],
        carbohydrates: ['', [Validators.required, Validators.min(1)]],
        fats: ['', [Validators.required, Validators.min(1)]],
      }),
    });
  }

  /**
   *
   * @private
   * @param isDeafult
   * @returns formgroup
   * @memberof RecipeFormPage
   *
   * @description
   * create the recipe ingridient in a  form group
   *
   */
  private _createIngridientsFormControls(): FormGroup {
    return this._fb.group({
      number: ['', [Validators.required, Validators.min(0)]],
      measurement: ['', Validators.required],
      ingridient: ['', Validators.required],
    });
  }

  /**
   *
   * @private
   * @param isDeafult
   * @returns formgroup
   * @memberof RecipeFormPage
   *
   * @description
   * create the recipe step in a  form group
   *
   */
  private _creatStepsFormControls(): FormGroup {
    return this._fb.group({
      step: ['', [Validators.required]],
    });
  }

  /*
   ********************************************************************************
   * form action
   ********************************************************************************
   */

  protected async onSubmit() {
    if (this.recipeForm.valid) {
      this.isSubmit = true;
      // create new recipe
      const resipe = this.recipeForm.value;
      const ingridientsControls = this.recipeForm.get('ingidients');

      resipe.ingidients = this._createIngridients();
      const keywords = this.recipeForm.get('keywords')?.value.split(',');
      const materials = this.recipeForm.get('materials')?.value.split(',');
      resipe.keywords = keywords;
      resipe.materials = materials;

      let recipeId = '';
      if (this.modus == 'created') {
        recipeId = await this._createResipe(resipe);
        this.recipe = resipe;
      } else if (this.modus == 'edit') {
        if (this.recipe.id) {
          recipeId = this.recipe.id;
        }
      }

      // fetches an ingredient from the database by its name
      // and will store the ingredient in the database
      // if it doesn't already exist
      if (ingridientsControls) {
        this._insertIngridients(ingridientsControls.value);
      }
    }
  }

  private _createIngridients(): string[] {
    const ingridients: string[] = [];
    for (let ingredient of this.ingridientControls.controls) {
      if (
        ingredient.get('number')?.value &&
        ingredient.get('measurement')?.value &&
        ingredient.get('ingridient')?.value
      ) {
        const ingridientTmp = `${ingredient.get('number')?.value}
        ${ingredient.get('measurement')?.value}
        ${ingredient.get('ingridient')?.value}`;
        ingridients.push(ingridientTmp);
      }
    }

    return ingridients;
  }

  private _insertIngridients(ingredients: I_IngredientFrom[]) {
    let promises = <any>[];

    ingredients.forEach(async (ingredient: I_IngredientFrom) => {
      const isIngridientInDb = await this._getIngridientByName(
        ingredient.ingridient.toLowerCase()
      );
      if (!isIngridientInDb) {
        const ingredientId = this._createIngridient(
          ingredient.ingridient.toLowerCase()
        );
        if (promises) {
          promises.push(ingredientId);
        }
      }
    });

    Promise.all(promises).finally(() => {
      this._modalCtrl.dismiss(this.recipe, 'recipe');
      this._router.navigateByUrl('/home');
    });
  }

  /*
   ********************************************************************************
   * From Helper get from control
   ********************************************************************************
   */

  /**
   *
   * @protected
   * @memberof AuthPage
   * @returns AbstractControl<any, any> | null
   *
   * @description
   * get the AbstractControl  "trainingCtrl"
   *
   */
  protected getFormCtrl(controlName: string): AbstractControl<any, any> | null {
    const e = this.recipeForm.get(controlName);
    return e;
  }

  /**
    /**
   *
   * @protected
   * @returns FormArray
   * @memberof RecipeFormPage
   *
   * @description
   * get the formcontrol "ingidient"
   *
   */
  protected get ingridientControls(): FormArray {
    return this.recipeForm.get('ingidients') as FormArray;
  }

  protected getIngridientItem(index: number, item: string): AbstractControl<any, any> | null {
    const ctrl = this.ingridientControls.controls[index]?.get(item);
    return ctrl ? ctrl : null;
  }

  protected getStepItem(index: number, item: string): AbstractControl<any, any> | null {
    const ctrl = this.stepsControls.controls.at(index)?.get(item);
    return ctrl ? ctrl : null;
  }

  /**
   *
   * @protected
   * @returns FormArray
   * @memberof RecipeFormPage
   *
   * @description
   * get the formcontrol "ingidient"
   *
   */
  protected get stepsControls(): FormArray {
    return this.recipeForm.get('steps') as FormArray;
  }

  /*
   ********************************************************************************
   * Form helper method to get the 'items' from FormArray
   ********************************************************************************
   */

  /**
   *
   * @protected
   * @memberof RecipeFormPage
   *
   * @description
   * adds a fromgroup from the "_createFormControls" method to the form
   *
   */
  protected addIngridient(): void {
    const items = this.ingridientControls as FormArray;
    items.push(this._createIngridientsFormControls());
  }

  /**
   *
   * @protected
   * @param index
   * index from form array
   * @memberof RecipeFormPage
   *
   * @description
   * remove a fromgroup from the "_createFormControls" method to the form
   *
   */
  protected delIngridient(): void {
    const items = this.ingridientControls as FormArray;
    items.removeAt(this.ingridientControls.length - 1);
  }

  /**
   *
   * @protected
   * @memberof RecipeFormPage
   *
   * @description
   * adds a fromgroup from the "_createFormControls" method to the form
   *
   */
  protected addStep(): void {
    const items = this.stepsControls as FormArray;
    items.push(this._creatStepsFormControls());
    console.log(this.stepsControls.controls);
  }

  /**
   *
   * @protected
   * @param index
   * index from form array
   * @memberof RecipeFormPage
   *
   * @description
   * remove a fromgroup from the "_createFormControls" method to the form
   *
   */
  protected delStep(): void {
    const items = this.stepsControls as FormArray;
    items.removeAt(this.stepsControls.length - 1);
  }

  /*
   ********************************************************************************
   *****
   ***
   * HTTP
   ***
   *****
   ********************************************************************************
   */
  private async _getIngridientByName(ingredient: string): Promise<boolean> {
    const ingridientRequest = await this._ingridientService.getByIngridient(
      ingredient
    );
    return ingridientRequest?.length ? true : false;
  }

  private async _createIngridient(ingredient: string): Promise<string> {
    try {
      const result = await this._ingridientService.create(ingredient);
      return result.id;
    } catch (error) {
      this._createErrorMessage(error);
      return '';
    }
  }

  private async _createResipe(resipe: I_Recipe): Promise<string> {
    try {
      const result = await this._recipiesService.create(resipe);
      return result.id;
    } catch (error) {
      this._createErrorMessage(error);
      return '';
    }
  }

  private _createErrorMessage(error: any) {
    if (error instanceof FirebaseError) {
      console.error(error.code);
      console.error(`message`, error.message);
    } else {
      console.error('Error by add ingridient');
    }
  }
}
