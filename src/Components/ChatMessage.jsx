import React from 'react'
import { auth }  from '../FireConfig/FirebaseConect'

function ChatMessage(props) {
  const { text, uid, photoURL} = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img className="profilePicture" src={photoURL} />
      <p className="messageText">{text}</p>
    </div>
  )
}

export default ChatMessage

