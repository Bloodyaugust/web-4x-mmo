import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Web 4x MMO" },
    { name: "description", content: "A Web 4x MMO Game" },
  ];
};

export default function Index() {
  return (
    <>
      <span>Placeholder</span>
    </>
  );
}
