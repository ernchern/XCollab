import { Injectable } from '@angular/core';
import { Exercise } from './exercise';
import { Discussion } from './discussion';
import { Comment } from './comment';
import { User } from './user';

import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
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

  // Returns an array, get the first element.
  getUser(user_uid): Observable<User[]> {
    const user = this.db.collection<User>('users', ref => ref.where('uid', '==', user_uid))
    return user.valueChanges();
  }

  getComments(exercise_id, discussion_id): Observable<Comment[]> {
    const exercise = this.db.collection<Exercise>('exercises').doc<Exercise>(exercise_id);
    const discussion = exercise.collection<Discussion>('discussions').doc<Discussion>(discussion_id);
    const comments = discussion.collection<Comment>('comments', ref => ref.orderBy('timestamp'))
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
    discussion.author = this.userUID;
    exercise.collection<Discussion>('discussions').add(discussion);
  }

  addComment(exercise_id, discussion_id, comment) {
    const exercise = this.db.collection<Exercise>('exercises').doc<Exercise>(exercise_id);
    const discussion = exercise.collection<Discussion>('discussions').doc<Discussion>(discussion_id);
    comment.author = this.userUID;
    comment.timestamp = firestore.FieldValue.serverTimestamp();
    discussion.collection<string>('comments').add(comment);
  }

  updateMastery(tag: string, action: string, masteryUser?: User) {
    if (!masteryUser) {
      masteryUser = this.user[0]
    }
    var masteryIndex = masteryUser.mastery.findIndex(m => m.tag == 'ml')
    if (masteryIndex < 0) {
      masteryUser.mastery.push({tag: 'ml', actions: [action]})
    } else {
      masteryUser.mastery[masteryIndex].actions.push(action)
    }
    const user = this.db.doc('users/'+this.userID);
    user.update({mastery: masteryUser.mastery});
  }

  getMastery(exercise, user):number {
    var mastery = user.mastery.find(m => m.tag == exercise.tags[0])
    console.log(mastery, exercise.tags[0])
    if (mastery) {
      return mastery.actions.length;
    }
    return 0;
  }

  initUser(uid) {
    this.userUID = uid;
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
        coins: 4,
        unlocked: [],
        concerned: [],
        mastery: []
      });
    } else {
      this.user = user;
    }
  }

  modifyCoins(number) : void {
    console.log("Prev Coins: " + this.user[0].coins);
    const reference = this.db.doc('users/' + this.userID);
    reference.update({coins: this.user[0].coins += number});
    console.log("Curr Coins: " + this.user[0].coins);
  }

  modifyOthersCoins(user_id, number) : void {
    console.log("Prev Coins: " + this.user[0].coins);
    const reference = this.db.doc('users/' + user_id);
    reference.update({coins: this.user[0].coins += number});
    console.log("Curr Coins: " + this.user[0].coins);
  }

  setSummary(exercise_id, discussion_id, summary) {
    const path = 'exercises/' + exercise_id + '/discussions/' + discussion_id;
    this.db.doc(path).update({summary: summary});
  }

  toggleConcern(exercise_id, discussion) {
    console.log('toggle', discussion)
    if (!this.isConcerned(discussion)) {
      discussion.concerned.push(this.userUID);
      const path = 'exercises/'+exercise_id+'/discussions/'+discussion.id;
      console.log(path)
      console.log(discussion)
      this.db.doc(path).update({concerned: discussion.concerned})
    }
  }

  addUnlockedExercise(exercise_id): void {
    const reference = this.db.doc('users/'+this.userID);
    const prev_unlocked = this.user[0].unlocked;
    reference.update({unlocked: prev_unlocked.concat([exercise_id])});
  }

  addUnlockedDiscussion(discussion_id): void {
    this.addUnlockedExercise(discussion_id);
  }

  isConcerned(discussion): boolean {
    console.log('isConcerned', discussion)
    return discussion.concerned.indexOf(this.userUID) > -1;
  }

  setSolvedComment(exercise_id, discussion_id, comment_id) {
    const reference = this.db.doc('exercises/' + exercise_id + "/discussions/" + discussion_id + "/comments/" + comment_id);
    reference.update({solution : true});
    const reference2 = this.db.doc('exercises/' + exercise_id + "/discussions/" + discussion_id);
    reference2.update({solved : true});
  }

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.exercises = this.getExercises()
    this.afAuth.user.subscribe(authData => this.initUser(authData.uid));
  }
}
