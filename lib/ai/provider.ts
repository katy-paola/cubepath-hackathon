import { createOpenAI } from "@ai-sdk/openai";

const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

export function getOpenRouterProvider() {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("Missing OPENROUTER_API_KEY");
  }

  return createOpenAI({
    name: "openrouter",
    apiKey,
    baseURL: OPENROUTER_BASE_URL,
  });
}
