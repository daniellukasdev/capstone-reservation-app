import React from "react";
import TableItem from "./TableItem";

export default function TableList({
  tables,
  setTables,
  setReservations,
  date,
}) {
  const tableItems = tables.map((table, index) => (
    <tr key={index}>
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
      <table className="table table-bordered table-striped no-wrap mt-3">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>TABLE NAME</th>
            <th>CAPACITY</th>
            <th>AVAILABILITY</th>
            <th>OPTIONS</th>
          </tr>
        </thead>
        <tbody>{tableItems}</tbody>
      </table>
    </div>
  );
}
