export const staticTexts = {
  "conversation.helptext":
    "This is your dedicated work-related chatbot. Ask it anything work-related, and rest assured, your and your clients data stays private. For any private messages, please use the web chat GPT model.",
  "conversation.headline": "Alvaro",
  "question.headline": "Alex",
  "login.headline": "DPM to enrich your online business",
  "login.session.descpription": "Welcome back, ",
  "login.nosession.descpription": "Just login and have fun.",
  "login.nosession.loginButton": "Login",
  "login.session.loginButton": "Start Chatting",
} as const;

export type StaticText = keyof typeof staticTexts;
