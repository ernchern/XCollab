import { Component, OnInit, Input } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Discussion } from '../discussion';
import { Exercise } from '../exercise';
import { User } from '../user';

@Component({
  selector: 'app-discussion-preview',
  templateUrl: './discussion-preview.component.html',
  styleUrls: ['./discussion-preview.component.scss']
})
export class DiscussionPreviewComponent implements OnInit {
  @Input('discussion') discussion: Discussion;
  @Input('exercise') exercise: Exercise;
  user: User;

  constructor(
    private exerciseService: ExerciseService,
  ) { }

  getData(): void {
    const user_uid = this.discussion.author;
    console.log(user_uid)
    this.exerciseService.getUser(user_uid).subscribe(user => this.user = user[0]);
  }

  ngOnInit() {
    this.getData();
  }
}
