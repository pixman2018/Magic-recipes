import {  Timestamp } from '@angular/fire/firestore';


export interface I_Recipe {
  id?: string;
  title: string;
  description: string;
  coverUrl: string;
  CookingTime: number;
  PreparationTime: number;
  DegreeOfDifficulty: number;
  MuscleBuildingFactor: number;
  WeightLossFactor: number;
  NutritionalValue: I_NutritionalValue;
  categories: string[];
  steps: string[];
  materials?: string[],
  creatAtTmp: Timestamp,
  updatAtmp: Timestamp,
}



interface I_NutritionalValue {
  portien: number,
  calories: number,
  carbohydrates: number,
  fats: number,
}

