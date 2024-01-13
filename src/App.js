import LoginForm from './components/authincation/LoginForm';
import './App.css';
import {  Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from './components/Mail/Welcome';
import { useSelector } from 'react-redux';
import RootLayout from './components/pages/RootLayout';
import Mailbox from './components/Mail/Mailbox';
import MessageView from './components/Inbox/MessageView';
import Inbox from './components/Inbox/Inbox';
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("isLoggedIn", isLoggedIn);
  return (
    <Routes>
    {!isLoggedIn && <Route path="/" element={<LoginForm />} exact />}
    {isLoggedIn && (
      <>
        <Route path="/" element={<RootLayout />} />
        <Route path="/composemail" element={<Mailbox />} />
        <Route path="/inbox/:emailId" element={<MessageView />} />
        <Route path="/inbox" element={<Inbox />} />
      </>
    )}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
  );
}

export default App;

