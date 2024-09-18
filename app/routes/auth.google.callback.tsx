import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const test = await authenticator.authenticate("google", request, {
    successRedirect: "/",
    throwOnError: true,
  });
  return test;
};
