# AngularFirebaseAuthLib

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## How to Implement into your Angular Projects

Into your existing angular project install firebase and firebase-ui

```bash
$ npm install firebase firebaseui @angular/fire firebaseui-angular
$ npm install @angular/material
$ npm install **my-library**
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
