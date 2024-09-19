import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { Form } from "@remix-run/react";
import { db } from "~/db.server";
import { authenticator } from "~/services/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);
  const formData = await request.formData();
  const empireName = String(formData.get("name"));
  const errors: Record<string, string> = {};

  console.log(user);
  if (!user) {
    errors.user = "Must be logged in";
    return json({ errors });
  }

  if (!empireName) {
    errors.name = "Must have an empire name";
    return json({ errors });
  }

  const existingEmpire = await db.empire.findUnique({
    where: { name: empireName },
  });

  if (existingEmpire) {
    errors.name = "An empire with that name already exists";
    return json({ errors });
  }

  const newEmpire = await db.empire.create({
    data: { name: empireName, turns: 10, user: { connect: { id: user.id } } },
  });

  const unownedWorlds = await db.world.findMany({
    where: {
      owner: null,
    },
  });
  const newEmpireWorld =
    unownedWorlds[Math.floor(Math.random() * unownedWorlds.length)];

  await db.world.update({
    where: {
      id: newEmpireWorld.id,
    },
    data: {
      owner: {
        connect: {
          id: newEmpire.id,
        },
      },
    },
  });

  return redirect(`/empires/${newEmpire.name}`);
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    throw redirect("/login");
  }

  return json({
    user,
  });
}

export default function Setup() {
  return (
    <Form method="post" className="flex flex-col gap-4">
      <h2>Setup your empire</h2>
      <div className="flex flex-col max-w-64">
        <label htmlFor="name">Empire Name</label>
        <input id="name" name="name" type="text" />
      </div>
      <button type="submit" className="max-w-fit p-2">
        Create Empire
      </button>
    </Form>
  );
}
