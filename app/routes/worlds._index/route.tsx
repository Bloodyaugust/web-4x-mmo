import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/db.server";

export async function loader() {
  return await db.world.findMany();
}

export default function Worlds() {
  const worlds = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-4">
      {worlds.map((world) => (
        <Link to={`/worlds/${world.name}`} key={world.id}>
          {world.name}
        </Link>
      ))}
    </div>
  );
}
