import { ChatCompletionRequestMessage } from 'openai';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getChatGPTResponse } from '../api/index';

type Context = {
  messages: ChatCompletionRequestMessage[];
  updateMessage: (message: ChatCompletionRequestMessage) => void;
  isLoading: boolean;
  isError: boolean;
  getAnswerFromGPT?: () => void;
  gptResponse: ChatCompletionRequestMessage | undefined;
};

export const ChatGPTContext = createContext<Context>({
  messages: [],
  isLoading: false,
  isError: false,
  getAnswerFromGPT: function (): void {
    throw new Error('Function not implemented.');
  },
  gptResponse: undefined,
  updateMessage: function (message: ChatCompletionRequestMessage): void {
    throw new Error('Function not implemented.');
  },
});

export const ChatGPTProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [queryBody, setQueryBody] = useState<ChatCompletionRequestMessage[]>([]);
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  // const isLoading = true;
  // const isError = false;

  const updateMessage = (message: ChatCompletionRequestMessage) => {
    setMessages((prevState) => {
      const newState = [...prevState, message];
      if (message.role === 'user') {
        setQueryBody(newState);
      }
      return newState;
    });
  };

  const { data, isLoading, isError } = useQuery(['chatGPT', queryBody], () =>
    getChatGPTResponse(queryBody)
  );

  useEffect(() => {
    console.log(`data: ${JSON.stringify(data)}`);
    if (data) {
      updateMessage(data?.choices[0].message as ChatCompletionRequestMessage);
      setQueryBody([]);
    }
  }, [data]);

  return (
    <ChatGPTContext.Provider
      value={{
        isLoading,
        isError,
        messages,
        updateMessage,
        gptResponse: data?.choices[0].message,
      }}
    >
      {children}
    </ChatGPTContext.Provider>
  );
};
