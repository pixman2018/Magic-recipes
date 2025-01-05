import { Injectable } from '@angular/core';
import { finalize, first, firstValueFrom, last, map, Observable, take, tap } from 'rxjs';

// class
import { HttpBasesAbstractClass } from '../http-basis-abstract-class';
// interface
import { I_Ingredient } from '../../Models/I_Ingredient';
import { addDoc, collection, collectionData, doc, DocumentReference, getCountFromServer, getDoc, getFirestore, limit, orderBy, query, Query, QuerySnapshot, where } from '@angular/fire/firestore';


import { serverTimestamp, Timestamp } from '@angular/fire/firestore';
import { DocumentData } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService extends HttpBasesAbstractClass {

  private _collectionRef;

  constructor() {
    super();
    this.dbPath = '/ingridients';
    this._collectionRef = collection(this.firebase, this.dbPath);
  }

  public async getAll(): Promise<I_Ingredient[]>{
    const ingridientQuery = query(this._collectionRef, orderBy('ingridient'), );
    const collectionData$  = collectionData(ingridientQuery, {
      idField: 'id'
    }) as Observable<I_Ingredient[]>;
    const ingridients = firstValueFrom(collectionData$);
    return ingridients;
  }

  public async getById(id: string): Promise<I_Ingredient | undefined> {
    const docRef = doc(this.firebase, `${this.dbPath}/${id}`);
    const documentSnapshot = await getDoc(docRef);
    return documentSnapshot.data() as Promise<I_Ingredient>;
  }

  public getByIngridient(ingridient: string): Promise<I_Ingredient[] | undefined> {
    const queryRef = query(this._collectionRef, where('ingridient', '==', ingridient));
    const collectionData$ = collectionData(queryRef, {
          idField: 'id'
        }) as Observable<I_Ingredient[]>;
    return firstValueFrom(collectionData$);
  }

  public async create(ingredientString: string): Promise<DocumentReference<DocumentData, DocumentData>> {
    const ingredient = {
      ingredient: ingredientString,
      creatAtTmp: Timestamp.fromDate(new Date()),
      updatAtmp: Timestamp.fromDate(new Date()),
    }


    const docRef = await addDoc(this._collectionRef, ingredient);
    return docRef;
  }

  public edit(id: string, changes: Partial<any>): Promise<void> {
    const ingriedent = this.afs.collection<I_Ingredient>(this.dbPath)
      .doc(id)
      .update(changes)
    return ingriedent;
  }

  public  delete(id: string): Promise<void>  {
    const ingriedent = this.afs.collection<I_Ingredient>(this.dbPath)
      .doc(id)
      .delete();
    return ingriedent;
  }

  public async countIngridient(): Promise<number> {
    const ingridientsCollection = collection(getFirestore(), this.dbPath);
    const snapshot = await getCountFromServer(ingridientsCollection);
    return snapshot.data().count;
  }
}

