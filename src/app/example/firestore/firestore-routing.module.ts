import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirestorePage } from './firestore.page';

const routes: Routes = [
  {
    path: '',
    component: FirestorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirestorePageRoutingModule {}
