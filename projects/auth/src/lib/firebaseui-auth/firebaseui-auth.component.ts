import { Component } from '@angular/core';
import { FirebaseUIModule } from 'firebaseui-angular';

@Component({
  selector: 'lib-firebaseui-auth',
  standalone: true,
  imports: [FirebaseUIModule],
  templateUrl: './firebaseui-auth.component.html',
  styleUrl: './firebaseui-auth.component.css',
})
export class FirebaseuiAuthComponent {}
