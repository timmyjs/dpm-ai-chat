import { cn } from "~/utils/cn";

export interface MessageProps {
  role: "user" | "assistant" | "system";
  content: string;
}

export const Message = ({ role, content }: MessageProps) => {
  const messageStyle = {
    assistant: "selft-start rounded-ss-sm bg-slate-900 text-slate-50",
    user: "animate-slideDownAndFadeIn self-end rounded-ee-sm bg-slate-100",
    system: "animate-slideDownAndFadeIn self-center rounded-md bg-orange-100",
  }[role];

  return (
    <div
      className={cn(
        "max-w-[90%] rounded-lg px-6 py-4 font-medium",
        messageStyle,
      )}
    >
      {content}
    </div>
  );
};
