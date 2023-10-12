import { type FormEvent, useState, useRef } from "react";
import * as Form from "@radix-ui/react-form";
import {
  ArrowPathRoundedSquareIcon,
  ArrowUturnLeftIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

import { Loader } from "~/components/Loader/Loader";
import { Message, type MessageProps } from "~/components/Message/Message";
import { api } from "~/utils/api";
import { checkMessageLimit } from "~/utils/prompt-utils";
import { trackPrompt } from "~/utils/tracking";
import { useSession } from "next-auth/react";

const MESSAGE_LIMIT = 5;

export const ConversationComponent = () => {
  const { isLoading, mutateAsync, error } =
    api.openai.conversation.useMutation();
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [displayMessage, setDisplayMessage] = useState<string>("");
  const session = useSession();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUndo = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    //prevent the form from submitting
    event.preventDefault();

    //set the display message to the last user message
    setDisplayMessage(
      messages.findLast((message) => message.role === "user")?.content ?? "",
    );

    //focus the input field
    inputRef.current?.focus();

    //reset the messages state to the last user message
    const spliceAmmount = -(
      messages.length -
      messages.findLastIndex((message) => message.role === "user")
    );
    setMessages((current) => {
      return current.slice(0, spliceAmmount);
    });
  };

  const messageLimitReached = checkMessageLimit({
    messages,
    messageLimit: MESSAGE_LIMIT,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const entries = Object.fromEntries(formData);
    //declare an array to store the conversation per request and send it to the api to prevent missmatch between the old and the new messages state
    const conversation: MessageProps[] = [];

    //add the current messages state to the conversation array, and push the new question in. Update the messages state
    conversation.push(...messages, {
      role: "user",
      content: entries.question as string,
    });
    setMessages(conversation);

    //reset the display message state
    setDisplayMessage("");

    event.currentTarget.reset();

    const data = await mutateAsync(conversation);

    if (data?.answer) {
      conversation.push({
        role: "assistant",
        content: data.answer,
      });
      setMessages(conversation);
      if (data.id && data.usage && session.data?.user.id)
        trackPrompt(
          "conversation_prompt",
          data.id,
          session.data?.user.id,
          data.usage,
          new Date(),
        );
    }
    if (messageLimitReached) {
      setMessages((current) => [
        ...current,
        {
          role: "system",
          content:
            "You have reached the message limit, please start a new conversation",
        },
      ]);
    }
    if (error) console.error(error);
  };

  return (
    <article className="flex h-full flex-col space-y-3 sm:space-y-6">
      <section className="flex flex-1 flex-col items-start space-y-4 rounded-lg border border-slate-200 bg-white p-4">
        <Message
          content={`Welcome to Alvaro! You have ${MESSAGE_LIMIT} questions before my limit is reached, no chat history saved. Please, remember to save your results, go ahead and ask your first one! :)`}
          role="assistant"
        />
        {messages.map((message, index) => (
          <Message {...message} key={index} />
        ))}
        {isLoading && (
          <div className="selft-start flex h-[56px] max-w-[90%] animate-slideDownAndFadeIn items-center rounded-lg rounded-ss-sm bg-slate-900 px-6 font-medium text-slate-50">
            <Loader />
          </div>
        )}
      </section>
      <Form.Root onSubmit={(event) => void handleSubmit(event)}>
        <div className="flex w-full space-x-4">
          <Form.Field className="w-full" name="question">
            <Form.Label className="sr-only">Question</Form.Label>
            <Form.Control asChild>
              <input
                ref={inputRef}
                autoFocus
                className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 disabled:bg-gray-200"
                placeholder={
                  messageLimitReached
                    ? "Start a new conversation"
                    : "Start typing..."
                }
                required
                disabled={messageLimitReached}
                type="text"
                value={displayMessage}
                onChange={(event) => setDisplayMessage(event.target.value)}
              />
            </Form.Control>
          </Form.Field>
          <Form.Submit asChild>
            <button
              onClick={messageLimitReached ? () => setMessages([]) : undefined}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white"
            >
              {messageLimitReached ? (
                <ArrowPathRoundedSquareIcon className="h-6 w-6" />
              ) : (
                <SparklesIcon className="h-6 w-6" />
              )}
            </button>
          </Form.Submit>
          <button
            onClick={(event) => handleUndo(event)}
            className=" flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white disabled:bg-gray-200"
            disabled={messages.length < 2}
          >
            <ArrowUturnLeftIcon className="h-6 w-6" />
          </button>
        </div>
      </Form.Root>
    </article>
  );
};
