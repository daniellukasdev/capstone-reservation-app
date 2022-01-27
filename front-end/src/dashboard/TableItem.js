import React from "react";
import { listTables, finishTable, listReservations } from "../utils/api";

export default function TableItem({ table, setTables, setReservations, date }) {
  async function handleDelete(tableId) {
    const abortController = new AbortController();
    const confirmation = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );
    if (confirmation) {
      return await finishTable(tableId, abortController.signal);
    }
    return () => abortController.abort();
  }

  // reloads the tables from the API
  async function refreshTables() {
    const abortController = new AbortController();
    const refreshedTables = await listTables(abortController.signal);
    setTables(refreshedTables);
    return () => abortController.abort();
  }

  // reloads the reservations from the API
  async function refreshReservations() {
    const abortController = new AbortController();
    const refreshedRes = await listReservations(
      { date },
      abortController.signal
    );
    setReservations(refreshedRes);
    return () => abortController.abort();
  }

  const { table_id, table_name, capacity, reservation_id } = table;
  return (
    <>
      <td>{table_id}</td>
      <td>{table_name}</td>
      <td>{capacity}</td>
      <td data-table-id-status={table.table_id}>
        {reservation_id ? "Occupied" : "Free"}
      </td>
      <td>
        {reservation_id && (
          <button
            data-table-id-finish={table.table_id}
            onClick={async (event) => {
              event.preventDefault();
              await handleDelete(table_id);
              await refreshTables();
              await refreshReservations();
            }}
            className="btn btn-outline-secondary"
          >
            Finish
          </button>
        )}
      </td>
    </>
  );
}
