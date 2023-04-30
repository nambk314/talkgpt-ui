import { ChatCompletionRequestMessage } from 'openai';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getChatGPTResponse, getSpeech } from '../api/index';
import { LANGUAGE_MAP, Tutor, TUTORS } from '../constants';

type Context = {
  messages: MessageWithAudio[];
  updateMessage: (message: ChatCompletionRequestMessage) => void;
  isLoading: boolean;
  isError: boolean;
  isLoadingSpeech: boolean;
  isErrorSpeech: boolean;
  getAnswerFromGPT?: () => void;
  gptResponse: ChatCompletionRequestMessage | undefined;
  speechData: string | undefined;
  tutor: Tutor;
  setTutor: (tutor: Tutor) => void;
};

export const ChatGPTContext = createContext<Context>({
  messages: [],
  isLoading: false,
  isError: false,
  getAnswerFromGPT: function (): void {
    throw new Error('Function not implemented.');
  },
  gptResponse: undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateMessage: function (message: ChatCompletionRequestMessage): void {
    throw new Error('Function not implemented.');
  },
  speechData: '',
  isLoadingSpeech: false,
  isErrorSpeech: false,
  tutor: {
    name: '',
    voice: '',
    ssmlGender: '',
    languageName: '',
  },
  setTutor: function (tutor: Tutor): void {
    throw new Error('Function not implemented.');
  },
});

type Speech = {
  text: string;
  index: number;
};

interface MessageWithAudio extends ChatCompletionRequestMessage {
  audio?: string;
}

const getDefaultPrompt = (tutor: Tutor): ChatCompletionRequestMessage => {
  const language = LANGUAGE_MAP[tutor.voice];
  return {
    role: 'system',
    content: `I want you to act as an ${language} teacher that want to teach me proper ${language}. Regardless of what language I use you will answer in ${language}. You goal is to keep the conversation going as long as possible. You can give out new topics to talk about and you can also give me questions to answer.`,
  };
};

export const ChatGPTProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tutor, setTutor] = useState<Tutor>(TUTORS[0]);
  const [prompt, setPrompt] = useState<ChatCompletionRequestMessage>(getDefaultPrompt(TUTORS[0]));
  const [queryBody, setQueryBody] = useState<ChatCompletionRequestMessage[]>([]);
  const [messages, setMessages] = useState<MessageWithAudio[]>([]);
  const [speech, setSpeech] = useState<Speech>({ text: '', index: -1 });

  useEffect(() => {
    setPrompt(getDefaultPrompt(tutor));
    console.log(`getDefaultPrompt(tutor): ${JSON.stringify(getDefaultPrompt(tutor))}`);
    setMessages([]);
    setQueryBody([]);
    setSpeech({ text: '', index: -1 });
  }, [tutor]);

  // const isLoading = true;
  // const isError = false;

  const updateMessage = (message: ChatCompletionRequestMessage) => {
    setMessages((prevState) => {
      const newState = [...prevState, message as MessageWithAudio];
      if (message.role === 'user') {
        setQueryBody([
          prompt,
          ...newState.map((m) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { audio, ...rest } = m;
            return rest;
          }),
        ]);
      } else {
        setSpeech({ text: message.content, index: newState.length - 1 });
      }
      return newState;
    });
  };

  const {
    data: gptData,
    isLoading,
    isError,
  } = useQuery(['chatGPT', queryBody], () => getChatGPTResponse(queryBody));

  useEffect(() => {
    console.log(`data: ${JSON.stringify(gptData)}`);
    if (gptData) {
      updateMessage(gptData?.choices[0].message as ChatCompletionRequestMessage);
      setQueryBody([]);
    }
  }, [gptData]);

  const {
    data: speechData,
    isLoading: isLoadingSpeech,
    isError: isErrorSpeech,
  } = useQuery(['ggSpeech', speech], () =>
    getSpeech(speech.text, tutor.voice, tutor.ssmlGender, tutor.languageName)
  );

  useEffect(() => {
    if (speechData && speech.text) {
      setMessages((prevState) => {
        const newState = [...prevState];
        newState[speech.index].audio = speechData;
        return newState;
      });
      setSpeech({ text: '', index: -1 });
      console.log(`speechData: ${speechData}`);
    }
  }, [speechData]);

  return (
    <ChatGPTContext.Provider
      value={{
        isLoading,
        isError,
        isLoadingSpeech,
        isErrorSpeech,
        messages,
        updateMessage,
        gptResponse: gptData?.choices[0].message,
        speechData,
        tutor,
        setTutor,
      }}
    >
      {children}
    </ChatGPTContext.Provider>
  );
};
