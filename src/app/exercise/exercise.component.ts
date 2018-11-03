import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ExerciseService } from '../exercise.service';

import { Exercise } from '../exercise';
import { Discussion } from '../discussion';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {
  exercise: Exercise;
  discussions: Discussion[];

  constructor(
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  getExercise(): void {
    // const id = +this.route.snapshot.paramMap.get('id');
    const id = 'gm5Ky39xI58ZhnbZLxlV'
    this.exerciseService.getExercise(id).subscribe(exercise => this.exercise = exercise);
    this.exerciseService.getDiscussions(id).subscribe(discussions => this.discussions = discussions);
  }

  ngOnInit() {
    this.getExercise();
  }

  goBack(): void {
    this.location.back();
  }
}
