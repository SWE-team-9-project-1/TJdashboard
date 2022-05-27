import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { useEffect } from 'react';
import ClassDashboard from './class-dashboard/ClassDashboard';
import EventCalendar from './event-calendar/EventCalendar';
import TeacherDirectory from './teacher-directory/TeacherDirectory';
import StudentDirectory from './student-directory/StudentDirectory';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home/Home';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCsmrQ-RviZVwkdw4FGfCGUqVBGVF7WTKA",
    authDomain: "swe-team9-project1.firebaseapp.com",
    databaseURL: "https://swe-team9-project1-default-rtdb.firebaseio.com",
    projectId: "swe-team9-project1",
    storageBucket: "swe-team9-project1.appspot.com",
    messagingSenderId: "591222057958",
    appId: "1:591222057958:web:ff5ca114e1b2ab899c8427",
    measurementId: "G-MNYWF5NVVH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
    return (
        <BrowserRouter
            className='App'
        >
            <Routes>
                <Route
                    path='/'
                    element={<Home />}
                >
                    <Route
                        path='/class-dashboard'
                        element={<ClassDashboard db={db}/>}
                    />
                    <Route
                        path='/event-calendar'
                        element={<EventCalendar db={db} />}
                    />
                    <Route
                        path='/student-directory'
                        element={<StudentDirectory db={db} />}
                    />
                    <Route
                        path='/teacher-directory'
                        element={<TeacherDirectory db={db} />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
