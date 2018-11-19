import { Component, OnInit, Input } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Comment } from '../comment';
import { User } from '../user';
import { Exercise } from '../exercise';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-comment-preview',
  templateUrl: './comment-preview.component.html',
  styleUrls: ['./comment-preview.component.scss']
})
export class CommentPreviewComponent implements OnInit {
  @Input('comment') comment: Comment;
  @Input('exercise') exercise: Exercise;
  user: User;
  mastery: number;
  showSolution: Boolean;
  canMarkAsSolution = true;

  constructor(
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  getData(): void {
    const user_uid = this.comment.author;
    this.canMarkAsSolution = (this.exerciseService.userUID != this.comment.author)
    console.log('can mark as solution', this.canMarkAsSolution)
    this.exerciseService.getUser(user_uid).subscribe((user) => {
      this.user = user[0];
      console.log('getmastery')
      this.mastery = this.exerciseService.getMastery(this.exercise, this.user)
      console.log(this.mastery)
    });
  }

  markAsSolution() {
    console.log("Mark as solution");
    if (this.canMarkAsSolution) {
      this.comment.solution = true;
      const exercise_id = this.route.snapshot.paramMap.get('exercise_id');
      const discussion_id = this.route.snapshot.paramMap.get('discussion_id');
      this.exerciseService.setSolvedComment(exercise_id, discussion_id, this.comment.id);
      //this.exerciseService.modifyOthersCoins(this.user.uid, 2);
      // Update Mastery
      this.exerciseService.updateMastery(this.exercise.tags[0], 'c', this.user)
    } else {
      alert("User cannot set his comment as solution");
    }
  }

  ngOnInit() {
    this.getData();
    this.showSolution = false;
  }
}
