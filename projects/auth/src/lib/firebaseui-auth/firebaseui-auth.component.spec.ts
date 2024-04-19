import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseuiAuthComponent } from './firebaseui-auth.component';

describe('FirebaseuiAuthComponent', () => {
  let component: FirebaseuiAuthComponent;
  let fixture: ComponentFixture<FirebaseuiAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirebaseuiAuthComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FirebaseuiAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
