import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../services/auth.service';
import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let authServiceMock: any;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj(AuthService, ['resetPassword']);
    await TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
      imports: [SignInComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    authServiceMock = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
