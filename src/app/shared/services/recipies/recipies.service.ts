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
import {  I_Recipe } from '../../Models/I_Recipies';
import { firstValueFrom, map, Observable } from 'rxjs';
import { HttpBasesAbstractClass } from '../http-basis-abstract-class';
import { I_Ingredient } from '../../Models/I_Ingredient';
import { DocumentData } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class RecipiesService extends HttpBasesAbstractClass {
  private _collectionRef;

  constructor() {
    super();
    this.dbPath = 'recipies';
    this._collectionRef = collection(this.firebase, this.dbPath);
  }

  public async getAll(search: string = ''): Promise<I_Recipe[]> {
    const queryRef = query(
      this._collectionRef,
      orderBy('title'),
      startAt(search),
      endAt(search + '\uf8ff')
    );
    const collectionData$ = collectionData(queryRef, {
      idField: 'id',
    }) as Observable<I_Recipe[]>;
    const recipies = firstValueFrom(collectionData$);

    return await recipies.then((result) => {
      this.convertSnaps(result);
      return recipies;
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
    const recipies = firstValueFrom(collectionData$);
    let res: I_Recipe[] = [];

    return await recipies.then((result) => {
      this.convertSnaps(result);
      return recipies;
    });
  }

  public async create(
    recipe: I_Recipe
  ): Promise<DocumentReference<DocumentData, DocumentData>> {
    recipe.creatAtTmp = Timestamp.fromDate(new Date());
    recipe.updatAtmp = Timestamp.fromDate(new Date());
    const docRef = await addDoc(this._collectionRef, recipe);
    return docRef;
  }

  public async edit(id: string, changes: Partial<any>): Promise<void> {}

  public async delete(id: string): Promise<void> {}
}
