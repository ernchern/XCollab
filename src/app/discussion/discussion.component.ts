import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Discussion } from '../discussion';
import { Exercise } from '../exercise';
import { Comment } from '../comment';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {
  discussion: Discussion;
  author: User;
  mastery: number;
  exercise: Exercise;
  showDiscussion: boolean = true;
  comments: Comment[];
  comment = {
    body: '',
    author: '',
    concerned: [],
    solution: false,
    summary: '',
  };
  summary: string;
  summaryAuthor: User;
  summaryMastery: number;
  showSummarize: Boolean = false;

  constructor(
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    const exercise_id = this.route.snapshot.paramMap.get('exercise_id');
    const discussion_id = this.route.snapshot.paramMap.get('discussion_id');
    this.exerciseService.getExercise(exercise_id).subscribe(e => this.exercise = e);
    this.exerciseService.getDiscussion(exercise_id, discussion_id).subscribe(d => {
      this.discussion = d
      this.exerciseService.getUser(d.author).subscribe(u => {
        this.author = u[0];
        this.mastery = this.exerciseService.getMastery(this.exercise, u[0])
      })
      this.exerciseService.getUser(this.discussion.summaryAuthorUID).subscribe(u => {
        this.summaryAuthor = u[0];
        this.summaryMastery = this.exerciseService.getMastery(this.exercise, u[0])
      })
    });
    this.exerciseService.getComments(exercise_id, discussion_id).subscribe(d => this.comments = d);
  }

  summarize(): void {
    const exercise_id = this.route.snapshot.paramMap.get('exercise_id');
    const discussion_id = this.route.snapshot.paramMap.get('discussion_id');
    this.exerciseService.setSummary(exercise_id, discussion_id, this.summary);
    this.exerciseService.modifyCoins(2);
  }

  saveComment(): void {
    var exercise_id = this.route.snapshot.paramMap.get('exercise_id');
    var discussion_id = this.route.snapshot.paramMap.get('discussion_id');
    this.exerciseService.addComment(exercise_id, discussion_id, this.comment);
    // Update mastery
    this.exerciseService.updateMastery(this.exercise.tags[0], 'c')
    // Update coins
    this.exerciseService.modifyCoins(2);
  }

  goBack(): void {
    this.location.back();
  }

  unlockComments(): void {
    console.log("Test");
  }
}
