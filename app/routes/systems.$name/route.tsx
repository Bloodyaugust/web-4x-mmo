import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/db.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const system = await db.system.findUnique({
    where: { name: params.name },
  });

  return system;
}

export default function System() {
  const system = useLoaderData<typeof loader>();

  if (!system) {
    return <span>System not found</span>;
  }

  return <span>{system.name}</span>;
}
