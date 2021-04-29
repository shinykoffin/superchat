import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import firebaseConfig from './firebaseConfig'

firebase.initializeApp(firebaseConfig)

const firestore = firebase.firestore()
const auth = firebase.auth()


export {firestore, auth}