import React from "react";
import TableItem from "./TableItem";

export default function TableList({
  tables,
  setTables,
  setReservations,
  date,
}) {
  /** 
   * iterates through the tables to create a 
   * TableItem component for each one
  */
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
  /** 
   * Displays a table of all tables and table information
  */
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
