import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: '🫡',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
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

