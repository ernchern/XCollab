import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SearchComponent } from './search/search.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { ExerciseComponent } from './exercise/exercise.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { DiscussionPreviewComponent } from './discussion-preview/discussion-preview.component';
import { UserComponent } from './user/user.component';
import { CommentPreviewComponent } from './comment-preview/comment-preview.component';

import { NgxMdModule } from 'ngx-md';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ExerciseComponent,
    DiscussionComponent,
    DiscussionPreviewComponent,
    UserComponent,
    CommentPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    NgxMdModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
