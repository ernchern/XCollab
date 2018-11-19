import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ExerciseService } from '../exercise.service';

import { Exercise } from '../exercise';
import { Discussion } from '../discussion';
import { User } from '../user';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
  exercise_id: string;

  constructor(
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private location: Location,
	private modalService: NgbModal
  ) { }

  exerciseId(): string {
    return this.route.snapshot.paramMap.get('exercise_id');
  }

  getData(): void {
    var id = this.route.snapshot.paramMap.get('exercise_id');
    this.exercise_id = id;
    this.exerciseService.getExercise(id).subscribe(d => this.exercise = d);
    this.exerciseService.getDiscussions(id).subscribe(d => this.discussions = d.sort((a, b) => b.concerned.length - a.concerned.length));
    console.log(this.exerciseService.userUID)
    this.exerciseService.getUser(this.exerciseService.userUID).subscribe(u => {
      this.discussionUnlocked = u[0].unlocked.indexOf(id) > -1
    });
  }

  saveDiscussion(): void {
    var id = this.route.snapshot.paramMap.get('exercise_id');
    this.exerciseService.addDiscussion(id, this.discussion);
    this.exerciseService.updateMastery(this.exercise.tags[0], 'd')
    this.exerciseService.modifyCoins(2);
  }
  
  checkLength(): boolean {
	if (this.discussion.title.length > 15 && this.discussion.body.length > 30) {
		return true
	}
	return false
  }

  open(content) {
    this.modalService.open(content);
  }
  
  ngOnInit() {
    this.getData();
  }

  goBack(): void {
    this.location.back();
  }

  unlockDiscussion(): void {
    console.log(this.exerciseService.user.coins)
    if (!this.showDiscussion) {
      if(this.exerciseService.user.coins > 0 && this.exerciseService.user.unlocked.indexOf(this.exercise_id) == -1) {
        this.exerciseService.modifyCoins(-1);
        this.exerciseService.addPonderingUser(this.exercise_id, this.exercise);
        this.exerciseService.addUnlockedExercise(this.exercise_id);
        this.discussionUnlocked = true;
        this.showDiscussion = !this.showDiscussion;
      } else if (this.exerciseService.user.unlocked.indexOf(this.exercise_id) > -1) {
        this.showDiscussion = !this.showDiscussion;
      } else if(this.exerciseService.user.coins < 1) {
        alert("Not enough coins. You need 1 coin to unlock discussions.");
      }
    } else {
      this.showDiscussion = !this.showDiscussion;
    }
  }
}
