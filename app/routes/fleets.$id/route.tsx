import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/db.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const fleet = await db.fleet.findUnique({
    where: { id: params.id },
  });

  return fleet;
}

export default function Fleet() {
  const fleet = useLoaderData<typeof loader>();

  if (!fleet) {
    return <span>System not found</span>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2>Ship count: {fleet.ships}</h2>
    </div>
  );
}
