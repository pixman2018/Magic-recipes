import { inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData } from '@angular/fire/compat/firestore';
import { I_Ingredient } from '../Models/I_Ingredient';
import { DocumentReference, Firestore } from '@angular/fire/firestore';

export abstract class HttpBasesAbstractClass {

  protected afs: AngularFirestore = inject(AngularFirestore);
  protected dbPath: string = '';
  protected firebase = inject(Firestore);

  constructor() {
  }

  public abstract getAll(): Promise<{}[]>;
  public abstract getById(id: string): Promise<{} | undefined>;

  public abstract create(item: any): Promise<DocumentReference<DocumentData, DocumentData>>;

  public abstract edit(id: string, changes: Partial<any>): Promise<void>;
  public abstract delete(id: string): Promise<void>;

  // observable
  // public convertSnaps<T>(result: any) {
  //   return <T[]> result.map((snap: any) => {
  //     return {
  //       id: snap.id,
  //       ...<any>snap
  //     }
  //   });
  // }

  public convertSnaps<T>(result: any) {
    return <T[]> result.map((snap: any) => {
      return {
        // key: snap['id'],
        ...<any>snap,
      }
    });
  }
}

