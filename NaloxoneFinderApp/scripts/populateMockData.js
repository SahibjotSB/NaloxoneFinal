import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAiKog0vSAQUmwxw7nXhZmZ89C4_lhugIo',
  authDomain: 'naloxonefinder-2067f.firebaseapp.com',
  projectId: 'naloxonefinder-2067f',
  storageBucket: 'naloxonefinder-2067f.firebasestorage.app',
  messagingSenderId: '59850262489',
  appId: '1:59850262489:android:3b7c273b025efb12ca3bc8',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const mockKits = [
  { latitude: 51.0486, longitude: -114.0708, verified: true },
  { latitude: 51.0452, longitude: -114.0625, verified: true },
  // Add more mock data as needed
];

async function populateMockData() {
  for (const kit of mockKits) {
    await addDoc(collection(db, 'kits'), kit);
  }
  console.log('Mock data populated successfully');
}

populateMockData();

