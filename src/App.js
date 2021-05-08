import React from "react";

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from './FireConfig/FirebaseConect'

import ChatRoom from './Components/ChatRoom'

import './App.css';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <div className="titleSection">
          <h1>superchat</h1>
          <h2>Simple lovely firebase chat</h2>
        </div>
        <SignOut />
      </header>
      <section className="AppSection">
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
    <button className ="button signIn" onClick={singInWithGoogle}>Sign in w Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button className="button signOut" onClick={() => auth.signOut()}>Sign Out</button>
  )
}
export default App;
