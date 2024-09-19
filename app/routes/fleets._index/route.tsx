import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import React from "react";
import TableControls from "~/components/table-controls";
import { db } from "~/db.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "0", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

  const fleets = await db.fleet.findMany({
    skip: page * pageSize,
    take: pageSize,
    orderBy: [{ ships: "asc" }],
  });
  const count = await db.fleet.count();

  return {
    count,
    fleets,
  };
}

export default function Fleets() {
  const { count, fleets } = useLoaderData<typeof loader>();

  return (
    <div className="grid grid-cols-1 gap-2 max-h-full overflow-y-auto">
      <div className="col-span-1">
        <TableControls count={count} />
      </div>
      <hr className="col-span-1" />
      <span>Ships</span>
      {fleets.map((fleet) => (
        <React.Fragment key={fleet.id}>
          <Link to={`/fleets/${fleet.id}`} className="border-b">
            {fleet.ships}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
}
