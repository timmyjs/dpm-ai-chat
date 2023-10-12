import { signIn, useSession } from "next-auth/react";
import { staticTexts } from "~/utils/static-texts";

export const Login = () => {
  const { data } = useSession();

  return (
    <div className=" flex-col items-center justify-center gap-4">
      <p className="mb-4 text-lg leading-8 text-gray-600 md:mt-6">
        {data?.user
          ? `${
              staticTexts["login.session.descpription"]
            } ${data.user?.name?.split(" ")[0]}!`
          : staticTexts["login.nosession.descpription"]}
      </p>
      <button
        className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => void signIn("google", { callbackUrl: "/question" })}
      >
        {data?.user
          ? staticTexts["login.session.loginButton"]
          : staticTexts["login.nosession.loginButton"]}
      </button>
    </div>
  );
};
