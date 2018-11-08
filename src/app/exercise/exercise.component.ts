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
  discussion = {
    author: '',
    title: '',
    body: '',
    summary: '',
    concerned: [],
    solved: false,
  }

  constructor(
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  exerciseId(): string {
    return this.route.snapshot.paramMap.get('exercise_id');
  }

  getData(): void {
    var id = this.route.snapshot.paramMap.get('exercise_id');
    this.exerciseService.getExercise(id).subscribe(d => this.exercise = d);
    this.exerciseService.getDiscussions(id).subscribe(d => this.discussions = d.sort((a, b) => b.concerned.length - a.concerned.length));
  }

  saveDiscussion(): void {
    var id = this.route.snapshot.paramMap.get('exercise_id');
    this.exerciseService.addDiscussion(id, this.discussion)
  }

  ngOnInit() {
    this.getData();
  }

  goBack(): void {
    this.location.back();
  }

  getUserName(uid): string {
    return this.exerciseService.user.name;
  }
}
