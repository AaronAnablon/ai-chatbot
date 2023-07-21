import { OpenAIApi, Configuration } from 'openai';

const apiKey = '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';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method should be POST' });
    return;
  }

  const { input } = req.body;

  const configuration = new Configuration({
    apiKey: apiKey,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: input }],
    });
    res.status(200).json({ message: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
}
