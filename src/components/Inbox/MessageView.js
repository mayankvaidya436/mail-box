import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Navbar from "../Header/Navbar";

const MessageView = () => {
      const { emailId } = useParams();
      const [email, setEmail] = useState(null);
      const [loading, setLoading] = useState(true);
      const userEmail = useSelector((state) => state.auth.userId);
      const replacedSenderMail = userEmail.replace(/[@.]/g, "");
      const [key, setKey] = useState();

      useEffect(() => {
        const fetchEmail = async () => {
          try {
            const response = await fetch(
              `https://mailboxclient-d7818-default-rtdb.firebaseio.com/sentMail${replacedSenderMail}.json`
            );

            if (!response.ok) {
              throw new Error("Failed to fetch emails");
            }

            const data = await response.json();

            if (data) {
              let foundEmail = false;

              Object.keys(data).forEach((key) => {
                const email = data[key];

                if (email.id === Number(emailId)) {
                  foundEmail = true;

                  console.log("Key:", key);
                  setKey(key);
                  const emailData = {
                    email: email.email,
                    subject: email.subject,
                    body: email.mailBody,
                  };

                  setEmail(emailData);
                  setLoading(false);
                  return;
                }
              });

              if (!foundEmail) {
                console.error(`Email with ID ${emailId} not found`);
              }
            } else {
              console.error("No emails found");
            }

            setLoading(false);
          } catch (error) {
            console.error("Error fetching emails:", error);
            setLoading(false);
          }
        };

        fetchEmail();
      }, [emailId, replacedSenderMail]);

      useEffect(() => {
        const updateRequest = async () => {
          if (email && key) {
            try {
              const response = await fetch(
                `https://mailboxclient-d7818-default-rtdb.firebaseio.com/sentMail${replacedSenderMail}/${key}.json`,
                {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    id: email.id,
                    email: email.email,
                    subject: email.subject,
                    mailBody: email.body,
                    emailIsNew: false,
                  }),
                }
              );

              const data = await response.json();
              console.log("updated", data);
            } catch (error) {
              console.error("Error updating email:", error);
            }
          }
        };

        updateRequest();
      }, [email, key, replacedSenderMail]);
  const handleForward = () => {
    console.log("Forwarding email:", email);
  };

  const handleReply = () => {
    console.log("Replying to email:", email);
  };

  if (loading) {
    return <div>Loading email...</div>;
  }

  if (!email) {
    return <div>Email not found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4 w-50">
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">{email.email}</h5>
          </div>
          <div className="card-body">
            <p className="card-text">
              <strong>Subject:</strong> {email.subject}
            </p>
            <hr />
            <p className="card-text">{email.body}</p>
          </div>
          <div className="card-footer text-muted d-flex justify-content-end ">
            <button
              className="btn btn-sm btn-secondary m-1"
              onClick={handleForward}
            >
              Forward
            </button>
            <button
              className="btn btn-sm btn-secondaryc m-1"
              onClick={handleReply}
            >
              Reply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageView;