import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {
  BehaviorSubject,
  Observable,
  catchError,
  from,
  throwError,
} from 'rxjs';
import { loginFormStateEnum } from '../enums/login.enums';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInUserSource = new BehaviorSubject<firebase.User | null>(null);
  private loginFormStateSource = new BehaviorSubject<loginFormStateEnum>(
    loginFormStateEnum.SignIn
  );

  constructor(
    private afAuth: AngularFireAuth,
    private errorHandler: ErrorHandlingService
  ) {
    this.subscribeAuthentication().subscribe(); // Initialize listening to auth state changes
  }

  signInWithEmail(
    email: string,
    password: string
  ): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      catchError((error) => {
        // Handle errors or log them
        return throwError(error);
      })
    );
  }

  signup(
    email: string,
    password: string
  ): Observable<firebase.auth.UserCredential> {
    return from(
      this.afAuth.createUserWithEmailAndPassword(email, password)
    ).pipe(
      catchError((error) => {
        // Handle errors or log them
        this.errorHandler.handleError(error);
        return throwError(error);
      })
    );
  }

  signOut(): Observable<void> {
    return from(this.afAuth.signOut()).pipe(
      catchError((error) => {
        // Handle errors or log them
        this.errorHandler.handleError(error);
        return throwError(error);
      })
    );
  }

  subscribeAuthentication(): Observable<firebase.User | null> {
    return new Observable((subscriber) => {
      const subscription = this.afAuth.authState.subscribe(
        (user) => {
          this.loggedInUserSource.next(user);
          subscriber.next(user);
        },
        (error) => {
          this.errorHandler.handleError(error);
          subscriber.error(error);
        }
      );

      // Cleanup on unsubscribe
      return {
        unsubscribe() {
          subscription.unsubscribe();
        },
      };
    });
  }

  getLoggedUser(): firebase.User | null {
    return this.loggedInUserSource.getValue();
  }

  getLoggedUserUpdates(): Observable<firebase.User | null> {
    return this.loggedInUserSource.asObservable();
  }

  getLoginFormState(): Observable<loginFormStateEnum> {
    return this.loginFormStateSource.asObservable();
  }

  resetPassword(email: string): Observable<void> {
    return from(this.afAuth.sendPasswordResetEmail(email)).pipe(
      catchError((error) => {
        // Handle errors or log them
        this.errorHandler.handleError(error);
        return throwError(error);
      })
    );
  }

  setFormState(state: loginFormStateEnum) {
    this.loginFormStateSource.next(state);
  }
}
