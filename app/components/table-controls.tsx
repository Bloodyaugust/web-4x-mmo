import { Form, Link, useSearchParams, useSubmit } from "@remix-run/react";
import { useMemo } from "react";
import styles from "./table-controls.module.css";
import clsx from "clsx";

type Props = {
  count: number;
};

export default function TableControls({ count }: Props) {
  const [searchParams] = useSearchParams();
  const submit = useSubmit();
  const { page, pageSize } = useMemo(() => {
    return {
      page: parseInt(searchParams.get("page") || "0"),
      pageSize: parseInt(searchParams.get("pageSize") || "10"),
    };
  }, [searchParams]);
  const pages = useMemo(() => {
    const p = [];

    for (let i = 0; i < count / pageSize; i++) {
      p.push(i);
    }

    return p;
  }, [count, pageSize]);

  return (
    <div className="flex gap-2 items-baseline">
      {pages.map((i) => (
        <Link
          to={{
            pathname: "/systems",
            search: `pageSize=${pageSize}&page=${i}`,
          }}
          key={i}
          className={clsx(page === i && "underline")}
        >
          {i}
        </Link>
      ))}
      <span>-</span>
      <Form method="get" className="flex gap-2 items-baseline">
        <label htmlFor="pageSize">Page Size</label>
        <select
          id="pageSize"
          name="pageSize"
          value={pageSize}
          onChange={(e) => submit(e.currentTarget.form)}
          className={styles.select}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="100">100</option>
        </select>
        <input type="number" id="page" name="page" value={page} hidden />
      </Form>
    </div>
  );
}
