import {
  ChatCompletionRequestMessage,
  Configuration,
  CreateChatCompletionResponse,
  OpenAIApi,
} from 'openai';
import _ from 'lodash';

const configuration = new Configuration({
  organization: 'org-cgKIAgB8vxwoWiXMzMRAlR0I',
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

export const getChatGPTResponse = async (
  content: ChatCompletionRequestMessage[]
): Promise<CreateChatCompletionResponse | null> => {
  if (_.isEmpty(content)) {
    return null;
  }
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: content,
  });
  console.log(completion.data.choices[0].message);
  return completion.data;
};
