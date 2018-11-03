import { Injectable } from '@angular/core';
import { Exercise } from './exercise';
import { Discussion } from './discussion';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  exercises: Observable<Exercise[]>;

  getExercises(): Observable<Exercise[]> {
    return this.db.collection<Exercise>('exercises').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Exercise;
        const id = a.payload.doc.id;
        return { id, ...data }
      }))
    );
  }

  getExercise(id): Observable<Exercise> {
    return this.db.collection<Exercise>('exercises').doc<Exercise>(id).valueChanges();
  }

  getDiscussions(id): Observable<Discussion[]> {
    const exercise = this.db.collection<Exercise>('exercises').doc<Exercise>(id);
    return exercise.collection<Discussion>('discussions').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Discussion;
        const id = a.payload.doc.id;
        return { id, ...data }
      }))
    );
  }

  constructor(private db: AngularFirestore) {
    this.exercises = this.getExercises()
  }
}
