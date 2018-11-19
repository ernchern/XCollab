import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Discussion } from '../discussion';
import { Exercise } from '../exercise';
import { Comment } from '../comment';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {
  discussion: Discussion;
  author: User;
  mastery: number;
  exercise_id: string;
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
  isConcerned: boolean;

  constructor(
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private location: Location,
	private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.exercise_id = this.route.snapshot.paramMap.get('exercise_id');
    const discussion_id = this.route.snapshot.paramMap.get('discussion_id');
    this.exerciseService.getExercise(this.exercise_id).subscribe(e => this.exercise = e);
    this.exerciseService.getDiscussion(this.exercise_id, discussion_id).subscribe(d => {
      this.discussion = d
      this.isConcerned = this.exerciseService.isConcerned(this.discussion)
      this.exerciseService.getUser(d.author).subscribe(u => {
        this.author = u[0];
        this.mastery = this.exerciseService.getMastery(this.exercise, u[0])
      })
      this.exerciseService.getUser(this.discussion.summaryAuthorUID).subscribe(u => {
        this.summaryAuthor = u[0];
        this.summaryMastery = this.exerciseService.getMastery(this.exercise, u[0])
      })
    });
    this.exerciseService.getComments(this.exercise_id, discussion_id).subscribe(d => this.comments = d);
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
    this.exerciseService.modifyCoins(1);
  }
  
  checkLength(): boolean {
    if (this.comment.body.length > 15) {
      return true
    }
    return false
  }

  open(content) {
    this.modalService.open(content);
  }

  goBack(): void {
    this.location.back();
  }

  unlockComments(): void {
    console.log("Test");
  }
}
