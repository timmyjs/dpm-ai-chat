import { type FormEvent, useState } from "react";
import * as Form from "@radix-ui/react-form";
import { api } from "~/utils/api";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { Loader } from "~/components/Loader/Loader";
import { Message, type MessageProps } from "~/components/Message/Message";
import { trackPrompt } from "~/utils/tracking";
import { useSession } from "next-auth/react";

export const Chat = () => {
  const { isLoading, mutateAsync, error } = api.openai.question.useMutation();
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const session = useSession();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const entries = Object.fromEntries(formData);

    setMessages([
      {
        role: "user",
        content: entries.question as string,
      },
    ]);

    event.currentTarget.reset();

    const data = await mutateAsync({
      question: entries.question as string,
    });

    if (data?.answer) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.answer,
        },
        {
          role: "system",
          content: "Type in your next Question.",
        },
      ]);
      if (data.id && data.usage && session.data?.user.id)
        trackPrompt(
          "question_prompt",
          data.id,
          session.data?.user.id,
          data.usage,
          new Date(),
        );
    }
    if (error) console.error(error);
  };

  return (
    <article className="flex h-full flex-col space-y-3 sm:space-y-6">
      <section className="flex flex-1 flex-col items-start space-y-4 rounded-lg border border-slate-200 bg-white p-4">
        <Message
          role="assistant"
          content="Welcome to Alex! One question at a time, and no chat history saved. Go ahead and ask! :)"
        />
        {messages.map((message, index) => (
          <Message key={index} {...message} />
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
                autoFocus
                className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4"
                placeholder="Start typing..."
                required
                type="text"
              />
            </Form.Control>
          </Form.Field>
          <Form.Submit asChild>
            <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white">
              <SparklesIcon className="h-6 w-6" />
            </button>
          </Form.Submit>
        </div>
      </Form.Root>
    </article>
  );
};
