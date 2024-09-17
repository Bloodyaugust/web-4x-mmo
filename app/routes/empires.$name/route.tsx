import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/db.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const empire = await db.empire.findUnique({
    where: { name: params.name },
  });

  return empire;
}

export default function Empire() {
  const empire = useLoaderData<typeof loader>();

  if (!empire) {
    return <span>Empire not found</span>;
  }

  return <span>{empire.name}</span>;
}
