import LoginForm from './components/authincation/LoginForm';
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginForm />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
