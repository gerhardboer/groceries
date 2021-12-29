import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn$: Observable<boolean>;
  loggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(
    public afAuth: Auth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.loggedIn$ = this.loggedInSubject.asObservable();
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        JSON.parse(localStorage.getItem('user') as string);
        this.loggedInSubject.next(true);
      } else {
        localStorage.setItem('user', '');
        JSON.parse(localStorage.getItem('user') as string);
        this.loggedInSubject.next(false);
      }
    });
  }

  // Sign in with email/password
  SignIn(email, password) {
    return signInWithEmailAndPassword(this.afAuth, email, password)
      .then((result) => {
        this.loggedInSubject.next(true);
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  SignUp(email, password) {
    return createUserWithEmailAndPassword(this.afAuth, email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      ? sendEmailVerification(this.afAuth.currentUser).then(() => {
          this.router.navigate(['verify-email-address']);
        })
      : Promise.resolve();
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return sendPasswordResetEmail(this.afAuth, passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') as string);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return signInWithPopup(this.afAuth, provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Sign out
  SignOut() {
    return signOut(this.afAuth).then(() => {
      localStorage.removeItem('user');
      this.loggedInSubject.next(false);
      this.router.navigate(['login']);
    });
  }
}
