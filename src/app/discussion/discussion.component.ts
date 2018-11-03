import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Discussion } from '../discussion';
import { Exercise } from '../exercise';
import { Comment } from '../comment';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {
  discussion: Discussion;
  exercise: Exercise;
  comments: Comment[];
  comment = {
    body: '',
    author: '',
    concerned: [],
    solution: false,
    summary: '',
  }

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
    this.exerciseService.getDiscussion(exercise_id, discussion_id).subscribe(d => this.discussion = d);
    this.exerciseService.getComments(exercise_id, discussion_id).subscribe(d => this.comments = d);
  }

  saveComment(): void {
    var exercise_id = this.route.snapshot.paramMap.get('exercise_id');
    var discussion_id = this.route.snapshot.paramMap.get('discussion_id');
    this.exerciseService.addComment(exercise_id, discussion_id, this.comment)
  }

  goBack(): void {
    this.location.back();
  }
}
