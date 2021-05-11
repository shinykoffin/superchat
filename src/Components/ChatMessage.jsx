import React from 'react'
import { auth, firestore }  from '../FireConfig/FirebaseConect'


function ChatMessage(props) {
  const { text, uid, photoURL, id} = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  const deleteMessage = (e)=>{
    e.preventDefault();
    firestore.collection("messages").doc(id).delete()
      .then(()=>{
        console.log("Message deleted");
      })
      .catch(err => console.log(err))
  }

  return (
    <div className={`message ${messageClass}`}>
      {(uid === auth.currentUser.uid) && <button onClick={deleteMessage}>Delete</button>}
      <img className="profilePicture" src={photoURL} />
      <p className="messageText">{text}</p>
    </div>
  )
}

export default ChatMessage

