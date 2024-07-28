import { TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { BehaviorSubject } from 'rxjs';
import { loginFormStateEnum } from '../enums/login.enums';
import { AuthService } from './auth.service';
import { ErrorHandlingService } from './error-handling.service';

fdescribe('AuthService', () => {
  let service: AuthService;
  let afAuthMock: any;
  let errorHandlingService: ErrorHandlingService;

  beforeEach(waitForAsync(() => {
    afAuthMock = {
      signInWithEmailAndPassword: jasmine
        .createSpy('signInWithEmailAndPassword')
        .and.returnValue(Promise.resolve({ user: { displayName: 'George' } })),
      createUserWithEmailAndPassword: jasmine
        .createSpy('createUserWithEmailAndPassword')
        .and.returnValue(Promise.resolve({ user: {} })),
      signOut: jasmine.createSpy('signOut').and.returnValue(Promise.resolve()),
      sendPasswordResetEmail: jasmine
        .createSpy('sendPasswordResetEmail')
        .and.returnValue(Promise.resolve()),
      authState: new BehaviorSubject<firebase.User | null>(null),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireAuth, useValue: afAuthMock },
        AuthService,
        ErrorHandlingService,
      ],
    });

    service = TestBed.inject(AuthService);
    errorHandlingService = TestBed.inject(ErrorHandlingService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign in with email and password', (done: DoneFn) => {
    service.signInWithEmail('test@example.com', 'password').subscribe({
      next: (result) => {
        const user = {
          user: { displayName: 'George' },
        } as firebase.auth.UserCredential;
        expect(result).toEqual(user);
        expect(afAuthMock.signInWithEmailAndPassword).toHaveBeenCalledWith(
          'test@example.com',
          'password'
        );

        done();
      },
    });
  });

  it('should handle error on sign in', (done: DoneFn) => {
    const error = new Error('Sign in error');
    afAuthMock.signInWithEmailAndPassword.and.returnValue(
      Promise.reject(error)
    );

    service.signInWithEmail('test@example.com', 'password').subscribe({
      error: (err) => {
        expect(err).toBe(error);
        done();
      },
    });
  });

  it('should signup with email and password', (done: DoneFn) => {
    service.signup('test@example.com', 'password').subscribe({
      next: (result) => {
        const user = { user: {} } as firebase.auth.UserCredential;
        expect(result).toEqual(user);
        expect(afAuthMock.createUserWithEmailAndPassword).toHaveBeenCalledWith(
          'test@example.com',
          'password'
        );
        done();
      },
    });
  });

  it('should handle error on sign up', (done: DoneFn) => {
    const error = new Error('Sign up error');
    afAuthMock.createUserWithEmailAndPassword.and.returnValue(
      Promise.reject(error)
    );

    service.signup('test@example.com', 'password').subscribe({
      error: (err) => {
        expect(err).toBe(error);
        done();
      },
    });
  });

  it('should signout', (done: DoneFn) => {
    service.signOut().subscribe((result) => {
      expect(result).toBe(undefined);
      expect(afAuthMock.signOut).toHaveBeenCalled();
      done();
    });
  });

  it('should handle signout error', (done: DoneFn) => {
    const error = new Error('Sign out Error');

    afAuthMock.signOut.and.returnValue(Promise.reject(error));

    service.signOut().subscribe({
      error: (err) => {
        expect(err).toEqual(error);
        done();
      },
    });
  });

  it('should get the logged in user', () => {
    const user = {
      displayName: 'George',
      email: 'test@example.com',
    } as firebase.User;

    afAuthMock.authState.next(user);

    expect(service.getLoggedUser()).toEqual(user);
  });

  it('should get the logged in user updates', (done: DoneFn) => {
    const userMock = {
      displayName: 'George',
      email: 'test@example.com',
    } as firebase.User;

    afAuthMock.authState.next(userMock);

    service.getLoggedUserUpdates().subscribe({
      next: (user: firebase.User | null) => {
        expect(user).toEqual(userMock);
        done();
      },
    });
  });

  it('should set and get the Login form state', () => {
    const formStateMock = loginFormStateEnum.SignIn;
    service.setFormState(formStateMock);

    service.getLoginFormState().subscribe({
      next: (state) => {
        expect(state).toEqual(formStateMock);
      },
    });
  });

  it('should reset the password', (done: DoneFn) => {
    service.resetPassword('test@example.com').subscribe({
      next: (result) => {
        expect(result).toBe(undefined);
        expect(afAuthMock.sendPasswordResetEmail).toHaveBeenCalledWith(
          'test@example.com'
        );
        done();
      },
    });
  });
});
