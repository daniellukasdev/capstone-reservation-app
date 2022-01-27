import React from "react";
import TableItem from "./TableItem";

export default function TableList({
  tables,
  setTables,
  setReservations,
  date,
}) {
  const tableItems = tables.map((table) => (
    <TableItem
      table={table}
      setTables={setTables}
      setReservations={setReservations}
      date={date}
    />
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
