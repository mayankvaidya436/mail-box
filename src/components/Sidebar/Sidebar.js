import React, { useState,useEffect } from 'react';
import { BsPencilSquare, BsInbox, BsFileText, BsTrash } from 'react-icons/bs';
import Mailbox from '../Mail/Mailbox';
import { useSelector } from 'react-redux';
const Sidebar = ({ onTabChange }) => {
    const userEmail = useSelector((state) => state.auth.userId);
    const replacedSenderMail = userEmail.replace(/[@.]/g, '');
  const [showComposeModal, setShowComposeModal] = useState(false);
   
  const [count,setCount] = useState(0);
  const handleComposeClick = () => {
    setShowComposeModal(true);
  };

  const handleCloseComposeModal = () => {
    setShowComposeModal(false);
  };
  const handleInboxClick = () => {
    onTabChange('inbox');
  };

  const handleDraftClick = () => {
    onTabChange('draft');
  };
const unreadCount = count;


useEffect(() => {
  const fetchEmails = async () => {
    try {
      const response = await fetch(
        `https://mailboxclient-d7818-default-rtdb.firebaseio.com/sentMail${replacedSenderMail}.json`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch emails');
      }

      const data = await response.json();

      if (data) {
        const unreadEmails = Object.values(data).filter((item) => item.emailIsNew);
        const emailIsNewArray = unreadEmails.map((item) => item.emailIsNew);
        console.log("emailIsNew array", emailIsNewArray.length);
        setCount(emailIsNewArray.length)
      }
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  fetchEmails();
}, []);

  return (
    <div className="sidebar bg-light" style={{"width":"15%","height":"80vh","marginTop":"2%","float":"left"}}>
      <button className="btn btn-primary btn-block mb-3 m-5" onClick={handleComposeClick}>
        <BsPencilSquare /> Compose
      </button>

      <ul className="list-group m-1">
        <li className="list-group-item" onClick={handleInboxClick}>
          <BsInbox /> Inbox {unreadCount}
        </li>
        <li className="list-group-item">
          <BsFileText /> Draft
        </li>
        <li className="list-group-item" onClick={handleDraftClick}>
          <BsTrash /> Trash
        </li>
      </ul>

      <Mailbox
        showComposeModal={showComposeModal}
        handleCloseComposeModal={handleCloseComposeModal}
      />
    </div>
  );
};

export default Sidebar;