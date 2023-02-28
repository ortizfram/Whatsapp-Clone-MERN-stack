import { Avatar } from '@mui/material';
import React from 'react';
import './SidebarChat.css';

function SidebarChat() {
  return (
    <div className='sidebarChat'>
      <Avatar />
      <div className="sidebarChat__info">
        <h2>Room name</h2>
        <p>Last message info</p>
      </div>
    </div>
  );
}

export default SidebarChat;
