import React from 'react'

function ChatReciever() {
  return (
        <p className='chat__message chat__reciever'>
            <span className='chat__name'>Octavio</span>

            Yoo! copied.

            <span className='chat__timestamp'>
            {new Date().toUTCString()}</span>
        </p>
  )
}

export default ChatReciever
