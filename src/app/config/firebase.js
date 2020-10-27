import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/database"
import "firebase/auth"
import "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "revents-286716.firebaseapp.com",
  databaseURL: "https://revents-286716.firebaseio.com",
  projectId: "revents-286716",
  storageBucket: "revents-286716.appspot.com",
  messagingSenderId: "755192527521",
  appId: "1:755192527521:web:9f3c7852de2aae3e844ee0",
}

firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase