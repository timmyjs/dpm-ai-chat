import { OpenAI, RateLimitError } from "openai";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { retry } from "~/utils/api-utils";
import { type ChatCompletionMessageParam } from "openai/resources/chat/completions";

const prisma = new PrismaClient();

// TODO: try to unify both public procedures so that we can use the same with either an input of type string or of type array object.

export const openaiRouter = createTRPCRouter({
  question: protectedProcedure
    .input(z.object({ question: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.session?.user?.id) {
        return await handleAPIRequest(input.question);
      }
    }),
  conversation: protectedProcedure
    .input(
      z.array(
        z.object({
          role: z.union([
            z.literal("assistant"),
            z.literal("user"),
            z.literal("system"),
          ]),
          content: z.string(),
        }),
      ),
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.session?.user?.id) {
        return await handleAPIRequest(input);
      }
    }),
});

const initClient = async () => {
  // pull key an init client on each request.
  const openaiKey = await prisma.key.findMany({
    where: {
      isRateLimited: false,
    },
    orderBy: {
      lastUsedAt: "asc",
    },
    take: 1,
  });

  // initialise openai client
  const openai = new OpenAI({
    apiKey: openaiKey[0]?.key,
  });

  // update last used at for current key and push to db
  await prisma.key.update({
    where: { id: openaiKey[0]?.id },
    data: { lastUsedAt: new Date() },
  });

  //return the client and the key
  return { openai, openaiKey };
};

const handleAPIRequest = async (
  input: string | ChatCompletionMessageParam[],
) => {
  // if (env.NODE_ENV === "development") {
  //   return {
  //     answer:
  //       "Using Development environment. Calls will not be forwarded to OpenAI.",
  //   };
  // }
  const { openai, openaiKey } = await initClient();

  // check if we actually have a key.
  if (!openaiKey[0]?.key) {
    return {
      answer: "There are currently no available keys. Please try again later.",
    };
  }

  try {
    const response = await retry(
      openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages:
          typeof input === "string"
            ? [{ role: "user", content: input }]
            : input,
        temperature: 0.2,
      }),
      () => console.log("Api call failed, retrying..."),
      4,
    );

    if (response?.choices[0]?.message.content) {
      console.log(response);
      return {
        answer: response.choices[0].message.content,
        id: response.id,
        usage: response.usage,
      };
    } else {
      return {
        answer:
          "Sorry, I couldn't quite understand your request, can you try again?",
      };
    }
  } catch (error) {
    if (error instanceof RateLimitError) {
      return {
        answer:
          "Seems your current key has been rate limited, please try again later.",
      };
    }
  }
};
