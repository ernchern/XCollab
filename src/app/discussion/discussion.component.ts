import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
 

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {
  exercise: Exercise;

  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExerciseService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getExercise();
  }

  getExercise(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.exerciseService.getExercise(id).subscribe(exercise => this.exercise = exercise);
  }

  goBack(): void {
    this.location.back();
  }
}
