import React from "react";
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from './FireConfig/FirebaseConect'

import ChatRoom from './Components/ChatRoom'


function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <SignOut />
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn(){
  const singInWithGoogle = ()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return(
    <button className ="button" onClick={singInWithGoogle}>Sign in w Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button className="button" onClick={() => auth.signOut()}>Sign Out</button>
  )
}
export default App;
