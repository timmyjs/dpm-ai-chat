import { type MessageProps } from "~/components/Message/Message";

export type checkMessageLimitProps = {
  messages: MessageProps[];
  messageLimit: number;
};

export const checkMessageLimit = ({
  messages,
  messageLimit,
}: checkMessageLimitProps) => {
  const userMessageCount = messages.filter(
    (message) => message.role === "user",
  );
  if (userMessageCount.length >= messageLimit) {
    return true;
  } else {
    return false;
  }
};
