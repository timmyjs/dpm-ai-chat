import cn from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import {
  ChatBubbleBottomCenterTextIcon,
  ChatBubbleLeftRightIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

export const Menu = () => {
  const { asPath } = useRouter();

  const isActive = (href: string) => href === `/${asPath.split("/")[1]!}`;

  return (
    <nav className="flex h-full flex-col items-center  space-y-8 text-slate-50">
      <Link
        className="opacity-70 transition-opacity hover:opacity-100"
        onClick={() => void signOut({ callbackUrl: "/" })}
        href="/"
      >
        <HomeIcon className="h-6 w-6" />
      </Link>
      <Link
        className={cn(
          "flex flex-col items-center space-y-2 transition-opacity hover:opacity-100",
          isActive("/question") ? "opacity-100" : "opacity-70",
        )}
        href="/question"
      >
        <div className="group relative flex">
          <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
          <span
            className="absolute left-1/2 z-10 mx-4 my-1 ml-6 -translate-y-2 rounded-md bg-teal-800 
            px-1.5 py-0.5 text-sm text-gray-100 opacity-0 group-hover:opacity-100 group-hover:delay-500"
          >
            Question
          </span>
        </div>
      </Link>
      <Link
        className={cn(
          "flex flex-col items-center space-y-2 transition-opacity hover:opacity-100",
          isActive("/conversation") ? "opacity-100" : "opacity-70",
        )}
        href="/conversation"
      >
        <div className="group relative flex">
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
          <span
            className="absolute left-1/2 z-10 mx-4 my-1 ml-6 -translate-y-2 rounded-md bg-teal-800 
            px-1.5 py-0.5 text-sm text-gray-100 opacity-0 group-hover:opacity-100 group-hover:delay-500"
          >
            Conversation
          </span>
        </div>
      </Link>
    </nav>
  );
};
