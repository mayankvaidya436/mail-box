import LoginForm from './components/authincation/LoginForm';
import './App.css';
import {  Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from './components/Mail/Welcome';
import { useSelector } from 'react-redux';
import RootLayout from './components/pages/RootLayout';
import Mailbox from './components/Mail/Mailbox';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("isLoggedIn", isLoggedIn);
  return (
    <>
      {isLoggedIn && <RootLayout/>}
      <Routes>
        {!isLoggedIn && <Route path="/" element={<LoginForm />} exact />}
        
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/composemail" element={<Mailbox/>}/>
      </Routes>
    
    </>
  );
}

export default App;

