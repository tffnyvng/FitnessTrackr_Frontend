import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../custom-hooks";

export default function ActivitiesForm() {
  const history = useHistory();
  const { token } = useAuth();

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://fitnesstrac-kr.herokuapp.com/api/activities",
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
      history.push(`/activities`);
    } catch (err) {
      console.error(err);
    }
  };

  return <div>hi im adding activities</div>;
}
