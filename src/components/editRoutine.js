import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { useAuth } from "../custom-hooks";

export default function EditRoutine() {
  const history = useHistory();
  const { token } = useAuth();
  let { _id } = useParams();
  console.log({ _id });

  const [form, setForm] = useState({ name: "", goal: "", isPublic: null });

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setForm({ ...form, [e.target.name]: e.target.checked });
      return;
    }

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://fitnesstrac-kr.herokuapp.com/api/routines/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();
      console.log({ data });
      history.push(`/me`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Goal:</label>
        <input
          type="text"
          name="goal"
          value={form.goal}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Public:</label>
        <input
          type="checkbox"
          name="isPublic"
          value={form.isPublic}
          onChange={handleChange}
        />
      </div>
      <input type="submit" value="Finish editing" />
      <button name="clear" onClick={() => history.push(`/me`)}>
        Cancel
      </button>
    </form>
  );
}
