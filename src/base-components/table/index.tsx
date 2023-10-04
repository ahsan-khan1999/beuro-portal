import React from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import TableRow from "./TableRow";

export default function Table() {
  return (
    <Layout>
      <TableLayout>
        <TableRow />
      </TableLayout>
    </Layout>
  );
}
