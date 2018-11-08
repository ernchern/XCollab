import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'exercise/:exercise_id', component: ExerciseComponent},
  { path: 'exercise/:exercise_id/discussion/:discussion_id', component: DiscussionComponent},
  { path: 'user/:user_id', component: UserComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
