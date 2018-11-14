import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ExerciseService } from '../exercise.service';

import { Exercise } from '../exercise';
import { Discussion } from '../discussion';
import { User } from '../user';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {
  exercise: Exercise;
  showDiscussion: Boolean = false;
  discussionUnlocked: Boolean = false;
  discussions: Discussion[];
  discussion = {
    author: '',
    title: '',
    body: '',
    summary: '',
    concerned: [],
    solved: false,
  }
  exercise_id: String;

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
    this.exercise_id = id;
    this.exerciseService.getExercise(id).subscribe(d => this.exercise = d);
    this.exerciseService.getDiscussions(id).subscribe(d => this.discussions = d.sort((a, b) => b.concerned.length - a.concerned.length));
    // this.discussionUnlocked = this.exerciseService.user[0].unlocked.indexOf(id) > -1; //for some reason user is undefined lol
  }

  saveDiscussion(): void {
    var id = this.route.snapshot.paramMap.get('exercise_id');
    this.exerciseService.addDiscussion(id, this.discussion);
    this.exerciseService.modifyCoins(2);
  }

  ngOnInit() {
    console.log("Exercise Init");
    this.getData();
    }

  goBack(): void {
    this.location.back();
  }

  unlockDiscussion(): void {
    console.log(this.exerciseService.user[0].coins)
    if (!this.showDiscussion) {
      if(this.exerciseService.user[0].coins > 0 && this.exerciseService.user[0].unlocked.indexOf(this.exercise_id) == -1) {
        this.exerciseService.modifyCoins(-1);
        this.exerciseService.addUnlockedExercise(this.exercise_id);
        this.discussionUnlocked = true;
        this.showDiscussion = !this.showDiscussion;
      } else if (this.exerciseService.user[0].unlocked.indexOf(this.exercise_id) > -1) {
        this.showDiscussion = !this.showDiscussion;
      }
    } else {
      this.showDiscussion = !this.showDiscussion;
    }
  }
}
