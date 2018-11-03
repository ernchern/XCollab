import { Injectable } from '@angular/core';
import { Exercise } from './exercise';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  exercises: Observable<Exercise[]>;

  getExercises(): Observable<any[]> {
    return this.db.collection<Exercise>('exercises').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Exercise;
        const id = a.payload.doc.id;
        return { id, ...data }
      }))
    );
  }

  getExercise(id): Observable<Exercise> {
    // return this.db.collection('exercises', ref => ref.where('id', '==', id)).valueChanges()[0];
    return this.db.doc<Exercise>('exercises/'+id).valueChanges();
  }

  constructor(public db: AngularFirestore) {
    this.exercises = this.getExercises()
  }
}
