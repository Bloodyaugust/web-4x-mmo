import { Link } from "@remix-run/react";

import styles from "./nav.module.css";

export default function Nav() {
  return (
    <div className={styles.nav}>
      <Link to="/">Empire</Link>
      <Link to="/systems">Systems</Link>
      <Link to="/planets">Planets</Link>
    </div>
  );
}
