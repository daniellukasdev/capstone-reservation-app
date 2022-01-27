import React from "react";
import TableItem from "./TableItem";

export default function TableList({
  tables,
  setTables,
  setReservations,
  date,
}) {
  const tableItems = tables.map((table) => (
    <tr key={table.table_id}>
      <TableItem
      table={table}
      setTables={setTables}
      setReservations={setReservations}
      date={date}
    />
    </tr>
  ));
  return (
    <div>
      <table className="table no-wrap mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Table Name</th>
            <th>Capacity</th>
            <th>Availability</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{tableItems}</tbody>
      </table>
    </div>
  );
}
