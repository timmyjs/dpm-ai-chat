import { type NextPage } from "next";
import Head from "next/head";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

import { Layout } from "~/layout/Layout";
import { ConversationComponent } from "~/components";
import { staticTexts } from "~/utils/static-texts";
import { serverSideAuth } from "~/utils/server-side-auth";

const Conversation: NextPage = () => {
  return (
    <>
      <Head>
        <title>DPM | Alvaro</title>
        <meta name="description" content="alfred-dpm" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Layout>
        <article className="flex h-full flex-col space-y-3 sm:space-y-6">
          <section>
            <div className="flex flex-row items-center space-y-2">
              <ChatBubbleLeftRightIcon className="h-6 w-6" />
              <h2 className="pl-3 text-lg font-bold">
                {staticTexts["conversation.headline"]}
              </h2>
            </div>
            <p>{staticTexts["conversation.helptext"]}</p>
          </section>
          <ConversationComponent />
        </article>
      </Layout>
    </>
  );
};

export default Conversation;

export const getServerSideProps = serverSideAuth;
