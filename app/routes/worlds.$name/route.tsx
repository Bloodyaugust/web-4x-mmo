import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/db.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const world = await db.world.findUnique({
    where: { name: params.name },
    include: { system: true, owner: true },
  });

  return world;
}

export default function World() {
  const world = useLoaderData<typeof loader>();

  if (!world) {
    return <span>World not found</span>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2>{world.name}</h2>
      <span>
        Location: ({world.locationX}, {world.locationY})
      </span>
      <Link to={`/systems/${world.system.name}`}>
        System: {world.system.name}
      </Link>
      {world.owner && (
        <Link to={`/empires/${world.owner.name}`}>
          Empire: {world.owner.name}
        </Link>
      )}
    </div>
  );
}
