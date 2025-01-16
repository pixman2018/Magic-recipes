import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  DocumentReference,
  endAt,
  Firestore,
  getDoc,
  orderBy,
  query,
  startAt,
  Timestamp,
  where,
} from '@angular/fire/firestore';
import {  I_Recipe } from '../../Models/I_Recipes';
import { firstValueFrom, map, Observable } from 'rxjs';
import { HttpBasesAbstractClass } from '../http-basis-abstract-class';
import { I_Ingredient } from '../../Models/I_Ingredient';
import { DocumentData } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class RecipesService extends HttpBasesAbstractClass {
  private _collectionRef;

  constructor() {
    super();
    this.dbPath = 'recipes';
    this._collectionRef = collection(this.firebase, this.dbPath);
  }

  public async getAll(search: string = ''): Promise<I_Recipe[]> {
    let queryRef: any;
    if (search) {
      queryRef = query(
        this._collectionRef,
        orderBy('title'),
        startAt(search),
        endAt(search + '\uf8ff')
      );
    } else {
      queryRef = query(
        this._collectionRef,
        orderBy('creatAt', 'desc'),
      );
    }


    const collectionData$ = collectionData(queryRef, {
      idField: 'id',
    }) as Observable<I_Recipe[]>;
    const recipes = firstValueFrom(collectionData$);

    return await recipes.then((result) => {
      this.convertSnaps(result);
      return recipes;
    });
  }

  public async getById(recipeId: string): Promise<I_Recipe> {
    const docRef = doc(this.firebase, `${this.dbPath}/${recipeId}`);
    const documentSnapshot = await getDoc(docRef);
    return documentSnapshot.data() as Promise<I_Recipe>;
  }

  public async getByCategory(category: string): Promise<I_Recipe[]> {
    const queryRef = query(
      this._collectionRef,
      where('categories', 'array-contains', category.toLowerCase()),
      orderBy('title')
    );
    const collectionData$ = collectionData(queryRef, {
      idField: 'id',
    }) as Observable<I_Recipe[]>;
    const recipes = firstValueFrom(collectionData$);
    let res: I_Recipe[] = [];

    return await recipes.then((result) => {
      this.convertSnaps(result);
      return recipes;
    });
  }

  public async create(
    recipe: I_Recipe
  ): Promise<DocumentReference<DocumentData, DocumentData>> {
    recipe.creatAt = Timestamp.fromDate(new Date());
    recipe.updatAt = Timestamp.fromDate(new Date());
    const docRef = await addDoc(this._collectionRef, recipe);
    return docRef;
  }

  public async edit(id: string, changes: Partial<any>): Promise<void> {}

  public async delete(id: string): Promise<void> {}
}
