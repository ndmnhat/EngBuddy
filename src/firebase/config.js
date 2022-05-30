import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCtrXsh_v_rkzyXtoAy7-508JI4EW7klDw",
  authDomain: "engbuddy-e0a64.firebaseapp.com",
  projectId: "engbuddy-e0a64",
  storageBucket: "engbuddy-e0a64.appspot.com",
  messagingSenderId: "537901384704",
  appId: "1:537901384704:web:2bab88bd5693150bdd04e5",
  measurementId: "G-GE7K4G7P5H"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
