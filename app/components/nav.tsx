import { NavLink } from "@remix-run/react";

import styles from "./nav.module.css";
import clsx from "clsx";

export default function Nav() {
  return (
    <div className={styles.nav}>
      <NavLink
        className={({ isActive }) => clsx(styles.a, isActive && styles.active)}
        to="/empires/Big Chungus"
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
        to="/planets"
      >
        Planets
      </NavLink>
    </div>
  );
}
