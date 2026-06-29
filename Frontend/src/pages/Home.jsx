import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import ChatWindow from '../components/ChatWindow/ChatWindow';
import ChatInput from '../components/ChatInput/ChatInput';
import SettingsModal from '../components/SettingsModal/SettingsModal';

const Home = () => {
  return (
    <div className="flex h-screen w-full bg-bg-dark overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full relative">
        <Navbar />
        <main className="flex-1 overflow-hidden relative flex flex-col w-full h-full">
          <ChatWindow />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-bg-chat via-bg-chat to-transparent pt-6">
            <ChatInput />
          </div>
        </main>
      </div>
      <SettingsModal />
    </div>
  );
};

export default Home;
