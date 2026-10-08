# Ai Chatbot

A small chatbot demo built with [Next.js](https://nextjs.org/), TypeScript and Tailwind CSS. It works on desktop and mobile and comes with ready-made example prompts.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and set `OPENAI_API_KEY` to a key from https://platform.openai.com/api-keys.

3. Start the development server and open [http://localhost:3000](http://localhost:3000):

   ```bash
   npm run dev
   ```

## Environment variables

| Variable | Required | Default | Purpose |
| --- | --- | --- | --- |
| `OPENAI_API_KEY` | Yes | | API key used to generate replies |
| `OPENAI_MODEL` | No | `gpt-4o-mini` | Chat model (use a non-reasoning model such as `gpt-4o-mini` or `gpt-4.1`; `gpt-5` models need a newer SDK) |
| `OPENAI_MAX_TOKENS` | No | `300` | Maximum length of each reply, in tokens |
| `RATE_LIMIT_MAX_PROMPTS` | No | `10` | Messages each visitor can send per window |
| `RATE_LIMIT_WINDOW_HOURS` | No | `24` | Length of the usage window, in hours |
| `MAX_INPUT_CHARS` | No | `2000` | Maximum length of a single message |
| `UPSTASH_REDIS_REST_URL` | In production | | Upstash Redis REST URL for storing usage limits |
| `UPSTASH_REDIS_REST_TOKEN` | In production | | Upstash Redis REST token |

## Notes on usage limits

This is a demo, so usage is capped:

- Each visitor can send **10 messages per 24 hours** by default. The page shows how many are left and when the allowance resets.
- Replies are capped at **300 tokens**, and each message can be up to **2,000 characters**.
- Set the Upstash variables in production. Without them, limits are kept in server memory, so they reset on every restart and aren't shared between server instances (for example, on Vercel).
- These limits stop casual overuse but can't stop a determined user. Also set a monthly budget for your OpenAI project as a hard cap on spending.

## Project structure

```
src/
  components/
    chat/       Chat window, input, message bubbles, usage note
    examples/   Example list and example dialog
    layout/     Sidebar, mobile header and drawer
  config/       Site-wide settings (name, links)
  data/         Example prompts
  hooks/        useChat: chat state and API calls
  lib/server/   Server-only code: config, OpenAI client, usage limits
  pages/        Next.js pages and API routes (/api/chat, /api/usage)
  styles/       Global CSS
  types/        Shared TypeScript types
```

## Deploy

The app deploys to [Vercel](https://vercel.com/new) as-is. Add the environment variables above in the project settings.
