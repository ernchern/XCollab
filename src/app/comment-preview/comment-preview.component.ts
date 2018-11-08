import { Component, OnInit, Input } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Comment } from '../comment';
import { User } from '../user';

@Component({
  selector: 'app-comment-preview',
  templateUrl: './comment-preview.component.html',
  styleUrls: ['./comment-preview.component.scss']
})
export class CommentPreviewComponent implements OnInit {
  @Input('comment') comment: Comment;
  user: User;

  constructor(
    private exerciseService: ExerciseService,
  ) { }

  getData(): void {
    const user_uid = this.comment.author;
    console.log(user_uid)
    this.exerciseService.getUser(user_uid).subscribe(user => this.user = user[0]);
  }

  ngOnInit() {
    this.getData();
  }
}
