import { DocumentData } from '@angular/fire/compat/firestore';
import {  DocumentReference, Timestamp } from '@angular/fire/firestore';

export interface I_Ingredient {
  id?:string;
  ingridient: string;
  creatAtTmp: Timestamp,
  updatAtmp: Timestamp,
}

// export interface I_IngredientInRecipe {
//   measurements: string,
//   ingridient: string;
// }

export interface I_RequiredIngredients {
  measurements: string,
  ingridient: string;
  recipeRefId: string;
  ingredientRefLink: DocumentReference<DocumentData, DocumentData>;
  creatAtTmp: Timestamp,
  updatAtmp: Timestamp,
}

export interface I_IngredientFrom {
  ingridient: string;
  measurement: string;
  number: number;
  ingredientRefLink?: DocumentReference<DocumentData, DocumentData>;
  creatAtTmp?: Timestamp,
  updatAtmp?: Timestamp,
}


