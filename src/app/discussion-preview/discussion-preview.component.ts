import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
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
  exercise_id: string;
  user: User;

  constructor(
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  getData(): void {
    const user_uid = this.discussion.author;
    this.exerciseService.getUser(user_uid).subscribe(user => {this.user = user[0];});
  }

  ngOnInit() {
    this.exercise_id = this.route.snapshot.paramMap.get('exercise_id');
    this.getData();
  }
  test() {
    console.log('test')
    console.log(this.user, this.discussion)
  }
}
