import React, { useEffect, useRef, useState } from "react";
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCzvEtxsi1_QSVLx5UcgdBlR4kP0tQIhGU",
  authDomain: "superchat-e25aa.firebaseapp.com",
  projectId: "superchat-e25aa",
  storageBucket: "superchat-e25aa.appspot.com",
  messagingSenderId: "259535872371",
  appId: "1:259535872371:web:e2fa03088e2521fcf5e506",
  measurementId: "G-GGY3M7SNNH"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

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
    <button onClick={singInWithGoogle}>Sign in w Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom(){
  const dummy = useRef()
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt');
  // const query = messagesRef.orderBy('createdAt').limit(100);

  const [messages] = useCollectionData(query, {idField: "id"});

  const [formValue, setFormValue] = useState('');

  useEffect(() =>{ 
    dummy.current.scrollIntoView({ behavior: 'smooth'});
  });

  const sendMessage = async(e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');
    
  }

  return(
    <>
      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}

        <div ref={dummy}></div>
      </main>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button type="submit" disabled={!formValue}>🎂</button>
      </form>
    </>
  )
}

function ChatMessage(props){
  const { text, uid, photoURL} = props.message;
  
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  )
}
export default App;
