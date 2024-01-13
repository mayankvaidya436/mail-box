import React, { useState } from 'react';
import { BsPencilSquare, BsInbox, BsFileText, BsTrash } from 'react-icons/bs';
import Mailbox from '../Mail/Mailbox';

const Sidebar = () => {
  const [showComposeModal, setShowComposeModal] = useState(false);

  const handleComposeClick = () => {
    setShowComposeModal(true);
  };

  const handleCloseComposeModal = () => {
    setShowComposeModal(false);
  };

  return (
    <div className="sidebar bg-light" style={{"width":"15%","height":"80vh","marginTop":"2%","float":"left"}}>
      <button className="btn btn-primary btn-block mb-3 m-5" onClick={handleComposeClick}>
        <BsPencilSquare /> Compose
      </button>

      <ul className="list-group m-1">
        <li className="list-group-item">
          <BsInbox /> Inbox
        </li>
        <li className="list-group-item">
          <BsFileText /> Draft
        </li>
        <li className="list-group-item">
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