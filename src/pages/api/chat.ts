import { OpenAIApi, Configuration } from 'openai';

const apiKey = process.env.OPENAI_API_KEY;

let tokensUsed = 0;
let lastTimestamp = Date.now();

const updateTokenUsage = (response) => {
  const now = Date.now();
  const tokens = response.data.usage.total_tokens;
  const duration = now - lastTimestamp;
  tokensUsed += tokens;
  lastTimestamp = now;
  if (duration > 60000) {
    tokensUsed = tokens;
  }
};

const createChatCompletion = async (input) => {
  const configuration = new Configuration({
    apiKey: apiKey,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: input }],
    });
    updateTokenUsage(response);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong.');
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method should be POST' });
    return;
  }

  const { input } = req.body;

  try {
    const response = await createChatCompletion(input);
    res.status(200).json({ message: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
}
