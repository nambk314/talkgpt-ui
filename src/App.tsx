import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import './App.css';
import Inbox from './components/inbox';
import { ChatGPTProvider } from './context/ChatContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>
        <ChatGPTProvider>
          <Inbox />
        </ChatGPTProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
