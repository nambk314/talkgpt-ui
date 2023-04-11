import React, { ReactNode } from 'react';

import { Card, CardContent, Typography } from '@mui/material';

import styles from './styles';
import './styles.css';

interface Props {
  role: string;
  children: ReactNode;
}

const Message: React.FC<Props> = ({ role, children }) => {
  const getMessageStyle = () => {
    let style = styles.message;
    if (role === 'user') {
      style = {
        ...style,
        ...styles.sentMessage,
      };
    }
    return style;
  };

  return (
    <Card sx={getMessageStyle()}>
      <CardContent
        sx={{
          '&:last-child': {
            paddingBottom: '16px',
          },
        }}
      >
        <Typography sx={{ whiteSpace: 'pre-wrap' }} component="div">
          {children}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Message;
