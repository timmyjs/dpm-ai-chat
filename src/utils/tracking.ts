import { type OpenAI } from "openai";

export const trackPrompt: (
  event: "conversation_prompt" | "question_prompt",
  conversationId: string,
  userId: string,
  usage: OpenAI.CompletionUsage,
  timestamp: Date,
) => void = (event, conversationId, userId, usage, timestamp) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: event,
    eventdata: {
      conversationId,
      usage,
      userId,
      timestamp,
    },
    _clear: true,
  });
};
export const trackUserLogin: (userId: string) => void = (userId) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "user_login",
    eventdata: {
      userId,
    },
    _clear: true,
  });
};
