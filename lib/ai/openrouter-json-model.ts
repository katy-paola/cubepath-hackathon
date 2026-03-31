import { extractJsonMiddleware, wrapLanguageModel } from "ai";

import { getOpenRouterProvider } from "./provider";

/** OpenRouter + strip de fences ```json para que `Output.object` pueda hacer parse. */
export function wrapOpenRouterForJsonOutput(modelId: string) {
  const openrouter = getOpenRouterProvider();
  return wrapLanguageModel({
    model: openrouter(modelId),
    middleware: extractJsonMiddleware(),
  });
}
