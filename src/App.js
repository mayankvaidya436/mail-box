import LoginForm from './components/authincation/LoginForm';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from './components/Mail/Welcome';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
      {!isLoggedIn && <Route path="/" element={<LoginForm />} />}
        {isLoggedIn ? (
          <Route path="/welcome" element={<Welcome />} />
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

