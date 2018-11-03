import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service'
import { Exercise } from '../exercise'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  exercises: Exercise[];

  constructor(private exerciseService: ExerciseService) {
  }

  getExercises(): void {
    this.exerciseService.exercises.subscribe(exercises => this.exercises = exercises);
  }

  ngOnInit() {
    this.getExercises();
  }

}
