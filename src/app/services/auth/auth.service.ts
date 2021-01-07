import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { User } from 'src/app/modules/user.model';
//import { User } from  'firebase';
// import { auth } from 'firebase/app';
// import * as firebase from 'firebase/app'
//import 'firebase/auth';
import firebase from "firebase";
//import * as firebase from 'firebase';
// import { firebase } from '@firebase/app';

import { AngularFireAuth } from  "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  // user$: User;

  constructor(public  afAuth:  AngularFireAuth,
              private afs: AngularFirestore,
              public  router:  Router) {

    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
          // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
    /*this.afAuth.authState.subscribe(user => {
      if (user){
        //this.user$ = user;
        localStorage.setItem('user', JSON.stringify(this.user$));
        this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        localStorage.setItem('user', null);
      }
    })*/
  }

  async emailSignin(email: string, password: string) {
    var result = await this.afAuth.signInWithEmailAndPassword(email, password)
    this.router.navigate(['profile/list']);
  }

  async emailSignup(username: string, email: string, password: string) {
    //const provider = new firebase.auth.EmailAuthProvider();
    await this.afAuth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      this.sendEmailVerification();
      this.updateUserData(user.user);
      this.updateEmailUser(user.user, username);
      console.log(user.user);
      this.router.navigate(['profile']);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });;

  }

  async updateEmailUser(user, username){
    // Updates the user attributes:
    user.updateProfile({
      displayName: username,
      photoURL: "./assets/images/logo/SmallLogo.png"
    }).then(function() {
      // Profile updated successfully!
      let displayName = user.displayName;
      let photoURL = user.photoURL;
    }, function(error) {
      // An error happened.
    });
  }

  async sendEmailVerification() {
    await (await this.afAuth.currentUser).sendEmailVerification()
    this.router.navigate(['admin/verify-email']);
  }

  async googleSignin(){
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    return userRef.set(data, { merge: true })

  }

  async signOut() {
    await this.afAuth.signOut();
    //localStorage.removeItem('user');
    this.router.navigate(['/']);
  }




}
