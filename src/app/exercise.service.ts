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

  constructor() { }
}
