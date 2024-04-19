import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FirebaseuiAuthComponent } from '../firebaseui-auth/firebaseui-auth.component';
import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, FirebaseuiAuthComponent],
  exports: [FirebaseuiAuthComponent],
  providers: [AuthService],
})
export class AuthModule {}
