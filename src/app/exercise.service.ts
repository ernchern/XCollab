import { Injectable } from '@angular/core';
import { Exercise } from './exercise';
import { Discussion } from './discussion';
import { Comment } from './comment';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  exercises: Observable<Exercise[]>;

  getExercises(): Observable<Exercise[]> {
    return this.db.collection<Exercise>('exercises').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Exercise;
        const id = a.payload.doc.id;
        return { id, ...data }
      }))
    );
  }

  getExercise(id): Observable<Exercise> {
    return this.db.collection<Exercise>('exercises').doc<Exercise>(id).valueChanges();
  }

  getDiscussions(id): Observable<Discussion[]> {
    const exercise = this.db.collection<Exercise>('exercises').doc<Exercise>(id);
    return exercise.collection<Discussion>('discussions').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Discussion;
        const id = a.payload.doc.id;
        return { id, ...data }
      }))
    );
  }

  getDiscussion(exercise_id, discussion_id): Observable<Discussion> {
    const exercise = this.db.collection<Exercise>('exercises').doc<Exercise>(exercise_id);
    const discussion = exercise.collection<Discussion>('discussions').doc<Discussion>(discussion_id);
    return discussion.snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as Discussion;
        const id = a.payload.id;
        return { id, ...data }
      })
    );
  }

  getComments(exercise_id, discussion_id): Observable<Comment[]> {
    const exercise = this.db.collection<Exercise>('exercises').doc<Exercise>(exercise_id);
    const discussion = exercise.collection<Discussion>('discussions').doc<Discussion>(discussion_id);
    const comments = discussion.collection<Comment>('comments')
    return comments.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Comment;
        const id = a.payload.doc.id;
        return { id, ...data }
      }))
    );
  }

  addDiscussion(exercise_id, discussion) {
    const exercise = this.db.collection<Exercise>('exercises').doc<Exercise>(exercise_id);
    // discussion.id = this.db.createId();
    discussion.author = "TODO"
    exercise.collection<Discussion>('discussions').add(discussion);
  }

  addComment(exercise_id, discussion_id, comment) {
    const exercise = this.db.collection<Exercise>('exercises').doc<Exercise>(exercise_id);
    const discussion = exercise.collection<Discussion>('discussions').doc<Discussion>(discussion_id);
    // comment.id = this.db.createId();
    comment.author = "TODO"
    discussion.collection<string>('comments').add(comment);
  }

  constructor(private db: AngularFirestore) {
    this.exercises = this.getExercises()
  }
}
