import { Component } from '@angular/core';
import { EXERCISES } from './mock-exercises';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CourseCollab';
  exercises = EXERCISES;
}
