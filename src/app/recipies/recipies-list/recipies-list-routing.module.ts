import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipiesListPage } from './recipies-list.page';

const routes: Routes = [
  {
    path: '',
    component: RecipiesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipiesListPageRoutingModule {}
