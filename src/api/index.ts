import { ChatCompletionRequestMessage, CreateChatCompletionResponse } from 'openai';
import _ from 'lodash';
import querystring from 'querystring';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND;

export const getChatGPTResponse = async (
  content: ChatCompletionRequestMessage[]
): Promise<CreateChatCompletionResponse | null> => {
  if (_.isEmpty(content)) {
    return null;
  }
  const response = await axios.post(`${baseUrl}/gpt/chatCompletion`, { content });
  return response.data;
};

export const getSpeech = async (
  text: string,
  voice: string,
  ssmlGender: string,
  languageName: string
) => {
  if (!text) {
    return;
  }
  const obj = {
    text,
    voice,
    ssmlGender,
    languageName,
  };

  const queryParams = querystring.stringify(obj);

  try {
    const response = await axios.get(`${baseUrl}/synthesize-speech?${queryParams}`, {
      responseType: 'blob',
    });
    const url = URL.createObjectURL(response.data);
    return url;
  } catch (error) {
    console.error(error);
  }
};
