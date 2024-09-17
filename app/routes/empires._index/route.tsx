import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/db.server";

export async function loader() {
  return await db.empire.findMany();
}

export default function Empires() {
  const empires = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-4">
      {empires.map((empire) => (
        <Link to={`/empires/${empire.name}`} key={empire.id}>
          {empire.name}
        </Link>
      ))}
    </div>
  );
}
