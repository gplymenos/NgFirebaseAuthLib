import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FirebaseUIModule } from 'firebaseui-angular';
import { loginFormStateEnum } from '../enums/login.enums';
import { AuthService } from '../services/auth.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@Component({
  selector: 'lib-firebaseui-auth',
  standalone: true,
  imports: [
    CommonModule,
    FirebaseUIModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    SignUpComponent,
    SignInComponent,
    ForgotPasswordComponent,
  ],
  templateUrl: './firebaseui-auth.component.html',
  styleUrl: './firebaseui-auth.component.css',
})
export class FirebaseuiAuthComponent implements OnInit {
  loginFormStatus = loginFormStateEnum;
  formState: loginFormStateEnum = loginFormStateEnum.SignIn;
  resetEmailSent: boolean = false;

  constructor(private dialog: MatDialog, private authService: AuthService) {}

  successCallback() {
    this.dialog.closeAll();
  }

  formStateChanged(event: loginFormStateEnum) {
    this.formState = event;
  }

  ngOnInit() {
    this.authService.getLoginFormState().subscribe((state) => {
      this.formState = state;
    });
  }

  changeLoginState(state: loginFormStateEnum) {
    this.authService.setFormState(state);
  }
}
