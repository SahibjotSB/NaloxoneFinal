import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAiKog0vSAQUmwxw7nXhZmZ89C4_lhugIo",  // Firebase API Key, which you should have in your Firebase project settings
  authDomain: "naloxonefinder-2067f.firebaseapp.com",  // Your Firebase Auth domain
  projectId: "naloxonefinder-2067f",  // Your Firebase Project ID
  storageBucket: "naloxonefinder-2067f.appspot.com",  // Your Firebase Storage Bucket URL
  messagingSenderId: "59850262489",  // Your Firebase Messaging Sender ID
  appId: "1:59850262489:android:3b7c273b025efb12ca3bc8",  // Your Firebase App ID
  measurementId: "your-measurement-id"  // Your Firebase Measurement ID, if applicable
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
