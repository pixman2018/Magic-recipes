import { inject, Injectable } from '@angular/core';
import { HttpBasesAbstractClass } from '../http-basis-abstract-class';
import { DocumentData } from '@angular/fire/compat/firestore';
import { addDoc, doc, DocumentReference, Timestamp, where } from '@firebase/firestore';
import { collection } from '@firebase/firestore';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { I_Ingredient, I_IngredientFrom } from '../../Models/I_Ingredient';
import { firstValueFrom, Observable } from 'rxjs';
import { query } from '@firebase/firestore';
import { IngredientsService } from '../ingredients-service/ingredients.service';

@Injectable({
  providedIn: 'root',
})
export class RequiredIngredientsService {

  protected firebase = inject(Firestore);

  public getByIngridient(
    ingridient: I_IngredientFrom,
    recipeId: string
  ): Promise<I_Ingredient[] | undefined> {
    const collectionRef = collection(
      this.firebase,
      `recipies/${recipeId}/requiredIngredients`
    );
    const queryRef = query(
      collectionRef,
      where('ingridient', '==', ingridient.ingridient),
      where('measurement', '==', ingridient.measurement),
      where('number', '==', ingridient.number),
    );
    const collectionData$ = collectionData(queryRef, {
      idField: 'id',
    }) as Observable<I_Ingredient[]>;
    return firstValueFrom(collectionData$);
  }

  public async create(
    ingredient: I_IngredientFrom,
    recipeId: string,
    ingredientId: string,
  ): Promise<DocumentReference<DocumentData, DocumentData>> {
    // create a documet referenz link to ingredient
    const ingredientDocRef = doc(this.firebase, `${'ingridients'}/${ingredientId}`);
    ingredient.ingredientRefLink = ingredientDocRef;

    const collectionRef = collection(
      this.firebase,
      `recipies/${recipeId}/requiredIngredients`
    );
    ingredient.creatAtTmp = Timestamp.fromDate(new Date());
    ingredient.updatAtmp = Timestamp.fromDate(new Date());
    const docRef = await addDoc(collectionRef, ingredient);
    return docRef;
  }
}
