import React,{useState} from 'react';
import Navbar from '../Header/Navbar';
import Inbox from '../Inbox/Inbox';
import Sidebar from '../Sidebar/Sidebar';
import Draft from '../Draft/Draft';
const RootLayout = (props) => {
    const [activeTab, setActiveTab] = useState('inbox');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <Navbar/>
      <Sidebar onTabChange={handleTabChange} />
      {activeTab === 'inbox' && <Inbox />}
      {activeTab === 'draft' && <Draft />}
      <div>{props.children}</div>
    </>
  );
};

export default RootLayout;