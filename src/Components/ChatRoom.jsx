import React, { useEffect, useRef, useState } from 'react'

import firebase from 'firebase/app';

import { firestore, auth } from '../FireConfig/FirebaseConect'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import ChatMessage from './ChatMessage'
import EmojiPicker from 'emoji-picker-react';

function ChatRoom() {
  const dummy = useRef()
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt');

  const [messages] = useCollectionData(query, {idField: "id"});

  const [formValue, setFormValue] = useState('');
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  useEffect(() =>{ 
    dummy.current.scrollIntoView({ behavior: 'smooth'});
  })

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
  const emojiPickerButtonHandler = (e) => {
    e.preventDefault();

    setEmojiPickerVisible(!emojiPickerVisible);
  }
  const onEmojiClickHandler = (e, emojiObj) => {
    setFormValue(formValue + emojiObj.emoji)
  }

  return (
    <>
      <main className="chatBody">
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}

        <div ref={dummy}></div>
      </main>

      <form onSubmit={sendMessage} className="formMessage">
        {emojiPickerVisible && <EmojiPicker onEmojiClick={onEmojiClickHandler} pickerStyle={{position: 'absolute', bottom: '110px', right: '20px'}}></EmojiPicker>}
        <input className="inputMessage" value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button className="button emojiPickerButton" onClick={emojiPickerButtonHandler}>😁</button>
        <button className="button sendBtn" type="submit" disabled={!formValue}>🎂</button>
      </form>
    </>
  )
}

export default ChatRoom