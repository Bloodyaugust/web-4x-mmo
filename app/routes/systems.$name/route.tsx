import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/db.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const system = await db.system.findUnique({
    where: { name: params.name },
    include: { worlds: true },
  });

  return system;
}

export default function System() {
  const system = useLoaderData<typeof loader>();

  if (!system) {
    return <span>System not found</span>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2>{system.name}</h2>
      <span>Worlds:</span>
      {system.worlds.map((world) => (
        <Link to={`/worlds/${world.name}`} key={world.id}>
          - {world.name}
        </Link>
      ))}
    </div>
  );
}
