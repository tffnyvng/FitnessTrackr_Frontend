import React, { useState } from "react";
import { useRoutinesForm } from "../custom-hooks";

export default function RoutinesForm({
  addNewRoutineFromForm,
  selectedRoutine,
  replaceEditedRoutine,
  clearSelectedRoutine,
}) {
  const { form, handleChange, handleSubmit } = useRoutinesForm({
    addNewRoutineFromForm,
    selectedRoutine,
    replaceEditedRoutine,
  });

  return (
    <form onSubmit={handleSubmit}>
      {form.id && (
        <div>
          <label>Id</label>
          <div>{form.id}</div>
        </div>
      )}
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
      <button name="clear" onClick={() => clearSelectedRoutine()}>
        Clear Routine Info
      </button>
      <input type="submit" value="Add Product" />
      <input type="submit" value="Edit Product" />
    </form>
  );
}
