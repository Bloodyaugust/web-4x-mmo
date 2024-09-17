import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/db.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const world = await db.world.findUnique({
    where: { name: params.name },
  });

  return world;
}

export default function World() {
  const world = useLoaderData<typeof loader>();

  if (!world) {
    return <span>World not found</span>;
  }

  return <span>{world.name}</span>;
}
