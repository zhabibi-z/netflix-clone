 import { initializeApp } from "firebase/app";
 import { createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import { addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
 
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: "netflix-clone-9969b.firebaseapp.com",
  projectId: "netflix-clone-9969b",
  storageBucket: "netflix-clone-9969b.firebasestorage.app",
  messagingSenderId: "22786365204",
  appId: "1:22786365204:web:779466266c1f7b664e9401"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const signup = async (name, email, password)=>{
try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
        uid:user.uid,
        name,
        authProvider: "local",
        email,
    })
} catch (error) {
   console.log(error);
   toast.error(error.code.split('/')[1].split('-').join(" "));
    }
} 

const login = async (email, password)=>{
try {
   await signInWithEmailAndPassword(auth, email, password);
} catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));  
}
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};
