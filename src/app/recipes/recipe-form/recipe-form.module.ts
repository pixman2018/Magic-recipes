import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipeFormPageRoutingModule } from './recipe-form-routing.module';

import { RecipeFormPage } from './recipe-form.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RecipeFormPageRoutingModule,
    SharedModule,
  ],
  declarations: [RecipeFormPage]
})
export class RecipeFormPageModule {}
