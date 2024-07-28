import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { of } from 'rxjs';
import { loginFormStateEnum } from '../enums/login.enums';
import { AuthService } from '../services/auth.service';
import { FirebaseuiAuthComponent } from './firebaseui-auth.component';

fdescribe('FirebaseuiAuthComponent', () => {
  let component: FirebaseuiAuthComponent;
  let fixture: ComponentFixture<FirebaseuiAuthComponent>;
  let authServiceMock: any;

  beforeEach(waitForAsync(() => {
    const authServiceSpy = jasmine.createSpyObj(AuthService, [
      'getLoginFormState',
      'setFormState',
    ]);

    TestBed.configureTestingModule({
      imports: [FirebaseuiAuthComponent],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(FirebaseuiAuthComponent);
    component = fixture.componentInstance;
    authServiceMock = TestBed.inject(AuthService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should do something', () => {
    const formState = loginFormStateEnum.SignIn;
    authServiceMock.getLoginFormState.and.returnValue(of(formState));
    component.ngOnInit();
    expect(component.formState).toEqual(formState);
  });

  it('should change the Login form state', () => {
    const newState = loginFormStateEnum.ForgotPassword;
    component.changeLoginState(newState);
    expect(authServiceMock.setFormState).toHaveBeenCalledWith(newState);
  });
});
