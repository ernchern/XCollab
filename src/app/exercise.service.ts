import { Injectable } from '@angular/core';
import { Exercise } from './exercise';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  exercises: Observable<any[]>;

  // getExercises(): Observable<any[]> {
  //   return of(this.exercises);
  // }

  // getExercise(id): Observable<Exercise> {
  //   return of(this.exercises.find(exercise => exercise.id === id));
  // }

  constructor(public db: AngularFirestore) {
    this.exercises = this.db.collection('exercises').valueChanges();
  }
}
