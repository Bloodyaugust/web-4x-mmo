import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import React from "react";
import TableControls from "~/components/table-controls";
import { db } from "~/db.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "0", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

  return {
    count: await db.system.count(),
    systems: await db.system.findMany({
      skip: page * pageSize,
      take: pageSize,
      orderBy: [{ name: "asc" }],
      include: {
        worlds: true,
      },
    }),
  };
}

export default function Systems() {
  const { count, systems } = useLoaderData<typeof loader>();

  return (
    <div className="grid grid-cols-2 gap-2 max-h-full overflow-y-auto">
      <div className="col-span-2">
        <TableControls count={count} />
      </div>
      <hr className="col-span-2" />
      <span>System Name</span>
      <span>Worlds</span>
      {systems.map((system) => (
        <React.Fragment key={system.id}>
          <Link to={`/systems/${system.name}`} className="border-b">
            {system.name}
          </Link>
          <span className="border-b">{system.worlds.length}</span>
        </React.Fragment>
      ))}
    </div>
  );
}
