import { Configuration, OpenAIApi } from "openai";
import { serverConfig } from "./config";

const SYSTEM_PROMPT = "You are a helpful assistant. Keep answers concise.";

const openai = new OpenAIApi(new Configuration({ apiKey: serverConfig.openai.apiKey }));

export const isOpenAIConfigured = () => serverConfig.openai.apiKey !== "";

type SdkError = {
  message?: string;
  response?: { status?: number; data?: { error?: { message?: string } } };
};

/** Summarises an SDK error for logging; the raw error includes the API key in its request headers. */
export const describeOpenAIError = (error: unknown) => {
  const { message, response } = error as SdkError;
  if (response) return `OpenAI responded ${response.status}: ${response.data?.error?.message ?? "no details"}`;
  return message ?? String(error);
};

export const generateReply = async (prompt: string): Promise<string> => {
  const response = await openai.createChatCompletion({
    model: serverConfig.openai.model,
    max_tokens: serverConfig.openai.maxReplyTokens,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: prompt },
    ],
  });

  const choice = response.data.choices[0];
  const reply = choice?.message?.content?.trim() ?? "";

  // The reply hit the token limit and was cut off mid-sentence.
  return choice?.finish_reason === "length" ? `${reply}…` : reply;
};
