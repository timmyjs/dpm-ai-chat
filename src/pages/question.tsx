import { type NextPage } from "next";
import Head from "next/head";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { Layout } from "~/layout/Layout";
import { Chat } from "~/components";
import { staticTexts } from "~/utils/static-texts";
import { serverSideAuth } from "~/utils/server-side-auth";

const Question: NextPage = () => {
  return (
    <>
      <Head>
        <title>DPM | Alex </title>
        <meta name="description" content="alfred-dpm" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Layout>
        <article className="flex h-full flex-col space-y-3 sm:space-y-6">
          <section>
            <div className="flex flex-row items-center space-y-2">
              <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
              <h2 className="pl-3 text-lg font-bold">
                {staticTexts["question.headline"]}
              </h2>
            </div>
            <p>{staticTexts["conversation.helptext"]}</p>
          </section>
          <Chat />
        </article>
      </Layout>
    </>
  );
};

export default Question;

export const getServerSideProps = serverSideAuth;
