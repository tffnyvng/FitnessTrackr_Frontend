import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../custom-hooks";

export default function AddNewRoutine() {
  const history = useHistory();
  const { token } = useAuth();

  const [form, setForm] = useState({
    name: "",
    goal: "",
    isPublic: null,
  });

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
        "https://fitnesstrac-kr.herokuapp.com/api/routines",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      console.log({ data });
      history.push(`/routines`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Goal</label>
        <input
          type="text"
          name="goal"
          value={form.goal}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Public</label>
        <input
          type="checkbox"
          name="isPublic"
          value={form.isPublic}
          onChange={handleChange}
        />
      </div>
      <input type="submit" value="Add Product" />
      <button name="clear" onClick={() => history.push(`/routines`)}>
        Cancel
      </button>
    </form>
  );
}
