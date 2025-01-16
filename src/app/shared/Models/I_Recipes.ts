import {  Timestamp } from '@angular/fire/firestore';


export interface I_Recipe {
  id?: string;
  title: string;
  description: string;
  coverUrl: string;
  CookingTime: number;
  PreparationTime: number;
  degreeOfDifficulty: number;
  muscleBuildingFactor: number;
  weightLossFactor: number;
  nutritionalValue: I_NutritionalValue;
  categories: string[];
  steps: string[];
  materials?: string[],
  ingredients: string[],
  creatAt: Timestamp,
  updatAt: Timestamp,
}



interface I_NutritionalValue {
  portien: number,
  calories: number,
  carbohydrates: number,
  fats: number,
}

