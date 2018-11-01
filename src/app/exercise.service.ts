import { Injectable } from '@angular/core';
import { Exercise } from './exercise';
import { EXERCISES } from './mock-exercises';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  getExercises(): Observable<Exercise[]> {
    return of(EXERCISES);
  }

  getExercise(id): Observable<Exercise> {
    return of(EXERCISES.find(exercise => exercise.id === id));
  }

  constructor() { }
}
