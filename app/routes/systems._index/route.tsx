import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/db.server";

export async function loader() {
  return await db.system.findMany();
}

export default function Systems() {
  const systems = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-4">
      {systems.map((system) => (
        <Link to={`/systems/${system.name}`} key={system.id}>
          {system.name}
        </Link>
      ))}
    </div>
  );
}
