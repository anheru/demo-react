import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAsLDttLw7wbxWkHs9ClKJPjfE3Iw5TFt0",
  authDomain: "edteam-react-cero-a1c58.firebaseapp.com",
  databaseURL: "https://edteam-react-cero-a1c58.firebaseio.com",
  projectId: "edteam-react-cero-a1c58",
  storageBucket: "edteam-react-cero-a1c58.appspot.com",
  messagingSenderId: "254409168166"
}

firebase.initializeApp(config)

export const firebaseAuth = firebase.auth
