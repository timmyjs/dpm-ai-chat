import Head from "next/head";
import Image from "next/image";
import logo from "../../public/img/DPM_Logo.png";
import catImage from "../../public/img/DPM_Cat.png";

import { Login } from "~/components";
import { staticTexts } from "~/utils/static-texts";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="DPM openai chat integration" />
      </Head>
      <main>
        <div className="relative bg-white">
          <div className="grid grid-cols-12 gap-x-4 md:gap-x-8">
            <div className="col-span-6 mb-20 px-6 pb-24 pt-10 md:pb-32 md:pt-48">
              <div>
                <Image
                  src={logo}
                  alt="DPM Logo"
                  width={200}
                  height={200}
                  priority
                />
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 md:mt-24 md:text-6xl">
                  {staticTexts["login.headline"]}
                </h1>
                <Login />
              </div>
            </div>
            <div className="col-span-6 overflow-x-hidden ">
              <div className="relative block h-screen w-full">
                <Image
                  src={catImage}
                  alt="DPM cat"
                  className="object-cover"
                  fill
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
