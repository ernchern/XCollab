import { Injectable } from '@angular/core';
import { Exercise } from './exercise';
import { Discussion } from './discussion';
import { Comment } from './comment';
import { User } from './user';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { reduce } from 'rxjs/operators';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  userUID: string;
  userID: string;
  userName: string;
  user: User;
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
    return exercise.collection<Discussion>('discussions', ref => ref.orderBy('concerned', "desc")).snapshotChanges().pipe(
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
    discussion.author = "users/" + this.userUID;
    exercise.collection<Discussion>('discussions').add(discussion);
  }

  addComment(exercise_id, discussion_id, comment) {
    const exercise = this.db.collection<Exercise>('exercises').doc<Exercise>(exercise_id);
    const discussion = exercise.collection<Discussion>('discussions').doc<Discussion>(discussion_id);
    comment.author = "users/" + this.userUID;
    discussion.collection<string>('comments').add(comment);
  }

  getUser(uid) {
    this.userUID = uid;
    // this.db.collection<User>('users', ref => ref.where('uid', '==', uid)).valueChanges().subscribe(d => this.checkUser(d[0], uid));
    var sub = this.db.collection<User>('users', ref => ref.where('uid', '==', uid)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User
        const id = a.payload.doc.id;
        this.userID = id;
        this.userName = data.name;
        return { id, ...data }
      }))).subscribe(d => this.checkUser(d, uid));
  }

  checkUser(user, uid) {
    if ((typeof user == 'undefined') || (user.length < 1)) {
      this.user = new User(uid);
      this.db.collection<User>('users').add({
        uid: this.user.uid,
        name: this.user.name,
        signature: this.user.signature,
        coins: 0,
        unlocked: [],
        concerned: [],
      });
    } else {
      this.user = user;
    }
  }

  toggleConcern(exercise_id, discussion) {
    const path = 'exercises/'+exercise_id+'/discussions/'+discussion.id;
    if (this.isConcerned(exercise_id, discussion.id)) {
      this.db.collection('users').doc(this.userID).collection('concerned').doc(path).delete();
      this.db.doc(path).update({'concerned': discussion.concerned - 1})
    } else {
      this.db.collection('users').doc(this.userID).collection('concerned').add({path:path, placeholder:1});
      this.db.doc(path).update({'concerned': discussion.concerned + 1})
    }
  }

  isConcerned(exercise_id, discussion_id): boolean {
    return false
  }

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.exercises = this.getExercises()
    this.afAuth.user.subscribe(authData => this.getUser(authData.uid));
  }
}
