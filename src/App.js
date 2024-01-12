import LoginForm from './components/authincation/LoginForm';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from './components/Mail/Welcome';
import { useSelector } from 'react-redux';
import Mailbox from './components/Mail/Mailbox';


function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("isLoggedIn", isLoggedIn);
  return (
    <BrowserRouter>
      <Routes>
      {!isLoggedIn && <Route path="/" element={<LoginForm />} exact />}
        {isLoggedIn && <Route path="/" element={<Mailbox/>} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

