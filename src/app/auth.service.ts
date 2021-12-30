import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithPopup, signOut } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { GoogleAuthProvider } from 'firebase/auth';

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
        this.loggedInSubject.next(true);
      } else {
        localStorage.setItem('user', '');
        this.loggedInSubject.next(false);
      }
    });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      return user !== null && user.emailVerified !== false ? true : false;
    }

    return false;
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    this.AuthLogin(provider);
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return signInWithPopup(this.afAuth, provider)
      .then((result) => {
        localStorage.setItem('user', JSON.stringify(result.user));
        this.loggedInSubject.next(true);
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
