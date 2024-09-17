import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/db.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const empire = await db.empire.findUnique({
    where: { name: params.name },
    include: {
      worlds: true,
    },
  });

  return empire;
}

export default function Empire() {
  const empire = useLoaderData<typeof loader>();

  if (!empire) {
    return <span>Empire not found</span>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2>{empire.name}</h2>
      <span>Turns: {empire.turns}</span>
      <span>Created: {empire.createdAt}</span>
      <span>Worlds:</span>
      <div className="flex flex-col gap-2 pl-4">
        {empire.worlds.map((world) => (
          <Link to={`/worlds/${world.name}`} key={world.id}>
            - {world.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
