import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipiesListPageRoutingModule } from './recipies-list-routing.module';

import { RecipiesListPage } from './recipies-list.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipiesListPageRoutingModule,
    SharedModule,
  ],
  declarations: [RecipiesListPage]
})
export class RecipiesListPageModule {}
