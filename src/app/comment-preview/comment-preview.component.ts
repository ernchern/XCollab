import { Component, OnInit, Input } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Comment } from '../comment';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-comment-preview',
  templateUrl: './comment-preview.component.html',
  styleUrls: ['./comment-preview.component.scss']
})
export class CommentPreviewComponent implements OnInit {
  @Input('comment') comment: Comment;
  user: User;
  showSolution: Boolean;

  constructor(
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  getData(): void {
    const user_uid = this.comment.author;
    console.log(user_uid)
    this.exerciseService.getUser(user_uid).subscribe(user => this.user = user[0]);
  }

  markAsSolution() {
    console.log("Mark as solution");
    if (this.exerciseService.user[0].uid != this.comment.author) {
      this.comment.solution = true;
      const exercise_id = this.route.snapshot.paramMap.get('exercise_id');
      const discussion_id = this.route.snapshot.paramMap.get('discussion_id');
      this.exerciseService.setSolvedComment(exercise_id, discussion_id, this.comment.id);
      //this.exerciseService.modifyOthersCoins(this.user.uid, 2);
    } else {
      console.log("User cannot set his comment as solution");
    }
  }

  ngOnInit() {
    this.getData();
    this.showSolution = false;
  }
}
