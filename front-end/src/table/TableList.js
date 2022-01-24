import React from "react";
import TableItem from "./TableItem";

export default function TableList({ tables }) {
  const tableItems = tables.map((table) => <TableItem table={table} />);
  return (
    <div>
      <table className="table no-wrap mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Table Name</th>
            <th>Capacity</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>{tableItems}</tbody>
      </table>
    </div>
  );
}
