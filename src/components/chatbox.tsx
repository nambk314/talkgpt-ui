import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { ChatCompletionRequestMessage } from 'openai';

interface props {
  onSend: (param: ChatCompletionRequestMessage) => void;
}

const ChatBox: React.FC<props> = ({ onSend }) => {
  const [text, setText] = useState('');

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (text.trim() !== '') {
        onSend({
          role: 'user',
          content: text,
        }); // Call the onEnter prop with the current text
        setText(''); // Clear the input field
      }
    }
  }

  return (
    <div>
      <TextField
        id="input-id"
        hiddenLabel
        placeholder="Message"
        multiline
        maxRows={10}
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={handleKeyDown}
        fullWidth
        className="mb-4"
      />
    </div>
  );
};

export default ChatBox;
