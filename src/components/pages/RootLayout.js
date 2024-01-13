import React from 'react';
import Navbar from '../Header/Navbar';
import Inbox from '../Inbox/Inbox';
import Sidebar from '../Sidebar/Sidebar';
const RootLayout = (props) => {
  return (
    <>
      <Navbar/>
      <Sidebar/>
      <Inbox/>
      <div>{props.children}</div>
    </>
  );
};

export default RootLayout;