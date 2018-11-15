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
  mastery: number[];
  masteryLabels: string[];
  masteries: number[];

  constructor(private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  getData() {
    const user_id = this.route.snapshot.paramMap.get('user_id');
    console.log(user_id)
    this.exerciseService.getUser(user_id).subscribe(u => {this.user = u[0];
                                                          this.mastery = this.getMasteryTotal();
                                                          console.log(this.mastery)
                                                          this.setupChart();
                                                          this.getMasteries()});
  }

  getMasteries() {
    this.masteryLabels = this.user.mastery.map(m => m.tag)
    this.masteries = this.user.mastery.map(m => m.actions.length)
    console.log(this.masteryLabels, this.masteries)
  }

  getMasteryTotal(): number[] {
    var discussions = 0;
    var comments = 0;
    var solutions = 0;
    for (var mastery of this.user.mastery) {
      for (var action of mastery.actions) {
        switch(action) {
          case "d":
            discussions += 1;
            break;
          case "c":
            comments += 1;
            break;
          case "s":
            solutions += 1;
          default:
            break;
        }
      }
    }
    return [comments, solutions, discussions]
  }

  setupChart() {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Talker', 'Solver', 'Questioner'],
        datasets: [{
          label: "you",
          data: this.mastery,
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
