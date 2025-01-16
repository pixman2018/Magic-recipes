import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirestorePageRoutingModule } from './firestore-routing.module';

import { FirestorePage } from './firestore.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FirestorePageRoutingModule,
    SharedModule
  ],
  declarations: [FirestorePage]
})
export class FirestorePageModule {}
