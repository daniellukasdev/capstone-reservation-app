import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import CancelBtn from "../buttons/CancelBtn";
import SubmitBtn from "../buttons/SubmitBtn";

export default function TableForm({ error, setError }) {
  // initial values of input fields
  const initialFormState = {
    "table_name": "",
    "capacity": "",
  }

  /**
   * state management of form input fields and error
   */
   const [formData, setFormData] = useState({ ...initialFormState });
   const history = useHistory();

   /**
   * functions to handle input changes
   */
  const handleInputChange = ({ target }) => {
    if (target.id === "capacity") {
      setFormData({
        ...formData,
        [target.id]: Number(target.value),
      });
    } else {
      setFormData({
        ...formData,
        [target.id]: target.value,
      });
    }
  };

  /**
   * sends POST request to api with formData,
   * sets state with returned promise,
   * sends user to the dashboard 
   */
  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await createTable(formData, abortController.signal);
      setFormData({...initialFormState});
      history.push("/dashboard");
    } catch (err) {
      setError(err);
    }
    return () => abortController.abort();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div className="row">
            <div className="form-group col">
              <label htmlFor="table_name">Table Name</label>
              <input
                type="text"
                className="form-control"
                id="table_name"
                name="table_name"
                value={formData.table_name}
                onChange={handleInputChange}
                required
                placeholder={"Table Name"}
                minLength={2}
              />
              <div className="d-flex justify-content-end mt-4">
                <CancelBtn goBack={true} />
              </div>
            </div>
            <div className="form-group col">
              <label htmlFor="capacity">Capacity</label>
              <input
                type="number"
                className="form-control"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                required
                min={1}
              />
              <div className="mt-4">
                <SubmitBtn />
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
