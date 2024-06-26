import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { loginFormStateEnum } from '../../enums/login.enums';
import { AuthService } from '../../services/auth.service';
import { ErrorHandlingService } from '../../services/error-handling.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  @Output() loginFormStateChanged = new EventEmitter();
  loginFormStatus = loginFormStateEnum;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private errorHandler: ErrorHandlingService
  ) {}

  submit(form: NgForm) {
    const value = form.value;
    this.authService.signInWithEmail(value.email, value.password).subscribe({
      next: () => {
        this.dialog.closeAll();
      },
      error: (error) => {
        const errorMessage = this.errorHandler.handleError(error);
        this.errorMessage = errorMessage;
      },
    });
  }

  forgotPasswordClicked() {
    this.loginFormStateChanged.emit(loginFormStateEnum.ForgotPassword);
  }

  changeLoginState(state: loginFormStateEnum) {
    this.authService.setFormState(state);
  }
}
