## Description

This is an implementation of FirebaseUi Auth component for Angular with a custom Sing In/Sign up form using a Angular Material Dialog.

![](.images/modal.png)

## How to Implement into your Angular Projects

Into your existing angular project install firebase and firebase-ui

```bash
$ npm install firebase firebaseui @angular/fire firebaseui-angular
$ npm install @angular/material
$ npm install @g.plymenos/ng-firebase-auth
```

In your angular.json file add any prefered Material theme and firebaseui styles under styles for build and test:

```javascript
"node_modules/firebaseui/dist/firebaseui.css", "@angular/material/prebuilt-themes/indigo-pink.css";
```

Create an environment.ts file and add firebase config provided when creating a Firebase project (https://firebase.google.com/docs/web/learn-more?hl=en&authuser=0)

```javascript
export const firebaseConfig: FirebaseConfig = {
  projectId: "",
  appId: "",
  apiKey: "",
  authDomain: "",
  storageBucket: "",
  messagingSenderId: "",
  measurementId: "",
};
```

Create a firebaseUiAuthConfig.ts file and add a firebaseUiConfig of type firebaseui.auth.Config. This file is the firebaseUi component configuration. For more info follow the link (https://github.com/firebase/firebaseui-web)

```javascript
import { FirebaseUIModule, firebase, firebaseui } from "firebaseui-angular";

export const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      scopes: ["public_profile", "email", "user_likes", "user_friends"],
      customParameters: {
        auth_type: "reauthenticate",
      },
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    },
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  ],
  tosUrl: "<your-tos-link>",
  privacyPolicyUrl: "<your-privacyPolicyUrl-link>",
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
};
```

Initialise your firebase Angular Module and FirebaseUi Module in your ngModule or appConfig depending on your Angular setup

```javascript
import { AngularFireModule } from "@angular/fire/compat";
import { FirebaseUIModule } from "firebaseui-angular";
import { AuthModule } from "auth";
import { firebaseUiAuthConfig } from "../firebaseUi.config";
import { firebaseConfig } from "../environment";

AuthModule, AngularFireModule.initializeApp(firebaseConfig), FirebaseUIModule.forRoot(firebaseUiAuthConfig);
```

Implement the Firebase Component into a Material Modal

```javascript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService, FirebaseuiAuthComponent } from 'auth'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private firebaseAuthService: AuthService, private dialog: MatDialog) {}

  openAuthModal() {
    this.dialog.open(FirebaseuiAuthComponent);
  }
}
```

If you would like to know when a user is loggedin/Loggedout and display information you can subscribe user changes as below:

```javascript
this.loggedUserSubscription = this.firebaseAuthService.getLoggedUserUpdates().subscribe((user) => {
  console.log("user");
  console.log(user);
  if (user) {
    // User is logged in
    this.loggedInUser = user;
  } else {
    // User is not logged in or has logged out
    this.loggedInUser = null;
  }
});
```
