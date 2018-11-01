import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise';
import { EXERCISES } from '../mock-exercises'

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {

  exercise = EXERCISES[0]E;

  constructor() {}

  ngOnInit() {
  }

}
