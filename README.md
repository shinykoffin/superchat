# 🤭📣Superchat
Hello, so this is a chat app, it is from a [tutorial](https://www.youtube.com/watch?v=zQyrwxMPm88) I followed from YT to learn fierebase and stuff. 

Is made with React, connects to firebase, auths with Google and updates in real time

Here are some things I've been adding to it.

## Things to add

* [x] Add an emoji picker

* [x] Changing the style a little

* [x] Adding a delete messages button

* [] Adding online users


## Installation
Well to install just clone the repository an install the thing:

` npm install `

then you migh want to create a new Firebase project usingm, Firestore and add a `messages` collection

Then go to the project config and create a web app to get the configuration to conect it, this is basicaly the `firebaseConfig` variable in the code that will appear after creating the app.

Now create a ` firebaseConfig.js ` file in the FireConfig directory with the variable on it, should look like this:

``` 
  const firebaseConfig = {
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "...",
    measurementId: "...."
  }

export default firebaseConfig

```

I mean instead of the dots there will be things... And It should work

Now just ` npm start ` and the app will be started.