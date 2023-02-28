import React from 'react';

function ChatMessage() {
  return (
    <div>
      <p className='chat__message'>
          <span className='chat__name'>MelonIsaGorilla</span>

          This is a message

          <span className='chat__timestamp'>
            {new Date().toUTCString()}</span>
        </p>
    </div>
  );
}

export default ChatMessage;
