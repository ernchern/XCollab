import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../user';
import { ExerciseService } from '../exercise.service';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User;

  constructor(private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  getData() {
    const user_id = this.route.snapshot.paramMap.get('user_id');
    console.log(user_id)
    this.exerciseService.getUser(user_id).subscribe(u => this.user = u[0]);
  }

  setupChart() {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Talker', 'Solver', 'Questioner'],
        datasets: [{
          label: "you",
          data: [15, 10, 5],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
          ],
        }]
      },
      options: {
        scale: {
          ticks: {
            suggestedMin: 0,
            suggestedMax: 20
          }
        }
      }
    });
  }

  ngOnInit() {
    this.getData();
    this.setupChart();
  }

}
