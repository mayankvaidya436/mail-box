import React, { useState, useEffect } from 'react';
import { ListGroup, Badge } from 'react-bootstrap';
import { BsEnvelope } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./Inbox.css"
const Inbox = () => {
      const [emails, setEmails] = useState([]);
      const userEmail = useSelector((state) => state.auth.userId);
      const replacedSenderMail = userEmail.replace(/[@.]/g, "");
      const navigate = useNavigate();
      
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
          const emailList = Object.values(data);
          setEmails(emailList);
        }
      } catch (error) {
        console.error('Error fetching emails:', error);
      }
    };

    

    fetchEmails();
  }, [replacedSenderMail]);

  const handleEmailClick = (emailId) => {
    console.log('Clicked email ID:', emailId);

    const updatedEmails = emails.map((email) =>
      email.id === emailId ? { ...email, isRead: true } : email
    );
    setEmails(updatedEmails);

    if (emailId) {
      navigate(`/inbox/${emailId}`);
    } else {
      console.error('Email ID is undefined or null.');
    }
  };

  return (
    <div className="inbox">
      <h2 className="mb-3 text-center">Inbox</h2>
      <ListGroup className="w-75 m-1">
        {emails.map((email) => (
         <ListGroup.Item
         style={{ margin: '1px 60px' }}
         key={email.id}
         action
         onClick={() => handleEmailClick(email.id)}
       >
   {email.emailIsNew ? <span className="new-message-dot"></span> : <span>&nbsp; &nbsp; </span> } 
         <BsEnvelope className="mr-2" />
         <Badge className="ml-2" style={{ margin: '1px 30px' }} variant="info">
         {email.email.length > 5 ? email.email.substring(0, 6) + "..." : email.email}
         </Badge>
         <span style={{ margin: '1px 30px' }}>{email.subject}</span>
         <span style={{ margin: '1px 10px' }}>
           {email.mailBody.length > 100
             ? email.mailBody.substring(0, 90) + '...'
             : email.mailBody}
         </span>
       </ListGroup.Item>

        ))}
      </ListGroup>
    </div>
  );
};

    export default Inbox;