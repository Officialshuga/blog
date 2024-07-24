import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";




const firebaseConfig = {
  apiKey: "AIzaSyCE3j-hsJTKXLetmYALtxr4ooSIgMfUUNg",
  authDomain: "blog-site-958a4.firebaseapp.com",
  projectId: "blog-site-958a4",
  storageBucket: "blog-site-958a4.appspot.com",
  messagingSenderId: "514514395727",
  appId: "1:514514395727:web:1dcd9ad6df3d263500003a"
};

 const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider(app)
export const storage = getStorage(app)