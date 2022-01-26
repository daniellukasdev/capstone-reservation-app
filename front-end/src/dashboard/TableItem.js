import React from "react";
import { listTables, finishTable } from "../utils/api";

export default function TableItem({ table, setTables }) {
  async function handleDelete(tableId) {
    const abortController = new AbortController();
    const confirmation = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );

    if (confirmation) {
      return await finishTable(tableId, abortController.signal);
      //   return await refreshTables();
    }

    return () => abortController.abort();
  }

  function refreshTables() {
    const abortController = new AbortController();
    // const refreshedTables = await listTables(abortController.signal);
    // setTables(refreshedTables);
    
    listTables(abortController.signal).then(setTables);

    return () => abortController.abort();
  }

  const { table_id, table_name, capacity, reservation_id } = table;
  return (
    <tr key={table_id}>
      <td>{table_id}</td>
      <td>{table_name}</td>
      <td>{capacity}</td>
      <td data-table-id-status={table.table_id}>
        {reservation_id ? "Occupied" : "Free"}
      </td>
      <td>
        {reservation_id && (
          <button data-table-id-finish={table.table_id}
            onClick={(event) => {
              event.preventDefault();
              handleDelete(table_id).then(refreshTables);
            }}
            className="btn btn-outline-secondary"
          >
            Finish
          </button>
        )}
      </td>
    </tr>
  );
}
