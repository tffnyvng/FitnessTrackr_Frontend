import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api/routines";

const initialFormState = {
  name: "",
  goal: "",
  isPublic: null,
};

export function useRoutinesForm({
  addNewRoutineFromForm,
  selectedRoutine,
  replaceEditedRoutine,
}) {
  const { routineId } = useParams();

  const { search, pathname } = useLocation();
  const editOrNew = pathname.slice(1); // removes the '/'

  const searchObj = new URLSearchParams(search);
  const name = searchObj.get("name");
  const goal = searchObj.get("goal");

  const { token, isLoggedIn } = useAuth();

  const [form, setForm] = useState({
    name,
    goal,
  });

  useEffect(() => {
    console.log("product change identified! btn was clicked");

    if (selectedRoutine.id) {
      setForm(selectedRoutine);
    } else {
      setForm(initialFormState);
    }
  }, [selectedRoutine]);

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setForm({ ...form, [e.target.name]: e.target.checked });
      return;
    }

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const buildFetchUrl = () => BASE_URL + (form.id ? `/${form.id}` : "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(buildFetchUrl(), {
        method: editOrNew === "edit" ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(
          editOrNew === "edit" ? { ...form, id: routineId } : form
        ),
      });

      const newOrEditedRoutine = await response.json();

      if (form.id) {
        replaceEditedRoutine(newOrEditedRoutine);
      } else {
        addNewRoutineFromForm(newOrEditedRoutine);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { form, setForm, handleChange, handleSubmit };
}
