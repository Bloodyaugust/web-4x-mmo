import { Form, Link } from "@remix-run/react";
import styles from "./header.module.css";
import { User } from "@prisma/client";

type Props = {
  user: User | null;
};

export default function Header({ user }: Props) {
  return (
    <div className="flex justify-between col-span-4">
      <h1 className={styles.header}>Web 4x MMO</h1>
      {user ? (
        <Form action="/logout" method="post">
          <button>Logout</button>
        </Form>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}
