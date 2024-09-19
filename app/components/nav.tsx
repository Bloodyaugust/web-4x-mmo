import { NavLink } from "@remix-run/react";

import styles from "./nav.module.css";
import clsx from "clsx";
import { Empire, User } from "@prisma/client";

type Props = {
  empire: Empire | null;
  user: User | null;
};

export default function Nav({ empire, user }: Props) {
  if (!user) {
    return (
      <div className={styles.nav}>
        <NavLink
          className={({ isActive }) =>
            clsx(styles.a, isActive && styles.active)
          }
          to="/login"
        >
          Login
        </NavLink>
      </div>
    );
  }

  if (!empire) {
    return (
      <div className={styles.nav}>
        <NavLink
          className={({ isActive }) =>
            clsx(styles.a, isActive && styles.active)
          }
          to="/setup"
        >
          Setup Empire
        </NavLink>
      </div>
    );
  }

  return (
    <div className={styles.nav}>
      <NavLink
        className={({ isActive }) => clsx(styles.a, isActive && styles.active)}
        to={`/empires/${empire.name}`}
      >
        My Empire
      </NavLink>
      <NavLink
        className={({ isActive }) => clsx(styles.a, isActive && styles.active)}
        to="/empires"
        end
      >
        Empires
      </NavLink>
      <NavLink
        className={({ isActive }) => clsx(styles.a, isActive && styles.active)}
        to="/systems"
      >
        Systems
      </NavLink>
      <NavLink
        className={({ isActive }) => clsx(styles.a, isActive && styles.active)}
        to="/worlds"
      >
        Worlds
      </NavLink>
    </div>
  );
}
