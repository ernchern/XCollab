import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {

  exercise: Exercise = {
    title: "ML Exercise 1",
    source: "Gabriel",
    tags: ["ML", "Bayesian Methods"],
    document_url: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-867-machine-learning-fall-2006/assignments/hw1.pdf",
    discussions: []
  }

  constructor() {}

  ngOnInit() {
  }

}
