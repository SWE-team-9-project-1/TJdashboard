import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { useEffect } from 'react';
import ClassDashboard from './class-dashboard/ClassDashboard';
import EventCalendar from './event-calendar/EventCalendar';
import TeacherDirectory from './teacher-directory/TeacherDirectory';
import StudentDirectory from './student-directory/StudentDirectory';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
    return (
        <div className="App">
            <ClassDashboard />
            <EventCalendar />
            <TeacherDirectory />
            <StudentDirectory />
        </div>
    );
}

export default App;
