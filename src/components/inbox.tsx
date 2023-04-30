import React, { RefObject, useEffect, useRef, useState, useContext } from 'react';
import Message from './message';
import ChatBox from './chatbox';
import { CircularProgress, Container, Divider, Stack } from '@mui/material';
import { ChatGPTContext } from '../context/ChatContext';
import UserHeader from './userHeader';

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

type AudioProps = {
  audio: string | undefined;
  role: string;
  isLoadingSpeech: boolean;
};

const Audio: React.FC<AudioProps> = ({ audio, role, isLoadingSpeech }) => {
  if (role === 'user') {
    return <React.Fragment></React.Fragment>;
  }
  if (isLoadingSpeech && !audio) {
    return <CircularProgress />;
  }
  return <audio src={audio} controls />;
};

const Inbox: React.FC = () => {
  const { tutor, setTutor, isLoading, isLoadingSpeech, messages, updateMessage, speechData } =
    useContext(ChatGPTContext);

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
      <UserHeader tutor={tutor} setTutor={setTutor} />
      <Divider />
      <Container sx={{ flex: 1, overflowY: 'scroll', padding: 0 }} ref={chatBoxRef}>
        <Stack spacing={1} sx={{ marginBottom: '20px' }}>
          {messages.map((m, i) => (
            <Message key={`${i}-id`} {...m}>
              {m.content}
              <div className="mt-3">
                <Audio audio={m.audio} role={m.role} isLoadingSpeech={isLoadingSpeech} />
              </div>
            </Message>
          ))}
          {isLoading && (
            <Message>
              <TypingDots />
            </Message>
          )}
        </Stack>
      </Container>
      <ChatBox onSend={updateMessage} />
    </Container>
  );
};

export default Inbox;
