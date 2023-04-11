import React, { RefObject, useEffect, useRef, useState, useContext } from 'react';
import Message from './message';
import ChatBox from './chatbox';
import { Container, Stack } from '@mui/material';
import { ChatGPTContext } from '../context/ChatContext';

// For loading
const TypingDots = () => {
  return (
    <div className="typing-dots">
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
    </div>
  );
};

const Inbox: React.FC = () => {
  const { isLoading, messages, updateMessage } = useContext(ChatGPTContext);

  const chatBoxRef: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    // Make sure we always scroll to the latest msg
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Container
      maxWidth="lg"
      className="bg-neutral-900"
      sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Container sx={{ flex: 1, overflowY: 'scroll', padding: 0 }} ref={chatBoxRef}>
        <Stack spacing={1}>
          {messages.map((m, i) => (
            <Message key={`${i}-id`} {...m}>
              {m.content}
            </Message>
          ))}
          {isLoading ? (
            <Message role="">
              <TypingDots />
            </Message>
          ) : (
            <React.Fragment />
          )}
        </Stack>
      </Container>
      <ChatBox onSend={updateMessage} />
    </Container>
  );
};

export default Inbox;
