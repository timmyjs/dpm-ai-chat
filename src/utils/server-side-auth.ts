import {
  getServerAuthSession,
  type getServerAuthSessionProps,
} from "~/server/auth";

export async function serverSideAuth(ctx: getServerAuthSessionProps) {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
